import { NorthpowerConfig } from '../northpower.config';
import { Guid } from '../utilities/Guid';
import { Identity, IGenericRepository } from "../_models";
import { Observable, empty, forkJoin } from "rxjs";
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

export class HttpRepository<T extends Identity> implements IGenericRepository<T> {

    _httpUrl: string;

    constructor(private objectStoreName: string, private url: string, private config: NorthpowerConfig, private http: Http, private service) {
        this._httpUrl = config.baseUrl + url;

        console.log('http repo constructor    ' + objectStoreName);
        console.log('url = ' + this._httpUrl);
    }

    getById(id: Guid): Observable<T> {
        console.log('getbyid');
        var serviceMethod = this.url + "Get";

        var observe = this.service[serviceMethod](id.toString(), "body");
        return observe;
    }

    getByIds(ids: Guid[]): Observable<T[]> {
        let observableBatch:Observable<T>[] = [];

        ids.forEach((id) => {
            observableBatch.push(this.getById(id));
        });

        return forkJoin(observableBatch);
    }
    getAll(): Observable<T[]> {
        var serviceMethod = this.url + "GetAll";

        var observe = this.service[serviceMethod]("body");

        return observe;
    }
    addRecord(record: T): Observable<boolean> {
        var serviceMethod = this.url + "Post";

        var observe = this.service[serviceMethod](record, "body");

        return observe;
    }
    updateRecord(record: T): Observable<boolean> {
        var serviceMethod = this.url + "Put";

        var observe = this.service[serviceMethod](record.id.toJSON, record, "body");

        return observe;
    }
    deleteRecordById(id: Guid): Observable<boolean> {
        var serviceMethod = this.url + "Delete";

        var observe = this.service[serviceMethod](id.toString, "body");

        return observe;
    }
    findByIndex(indexName: string, lower, upper): Observable<T[]> {
        return empty();
    }
    search(searchObject: T): Observable<T[]> {
        var properties: string[] = Object.getOwnPropertyNames(searchObject);
        var propertyValues: string[] = Object.keys(searchObject).map((key) => {
            return searchObject[key];
        });

        var index = 0;
        var queryString: string = null;
        properties.forEach((property) => {

            if (!queryString)
                queryString = '?';
            else
                queryString += '&';

            queryString += property + '=' + propertyValues[index];

            index++;
        });

        return this.http.get(this._httpUrl + queryString)
            .pipe(map((response: Response) => {
                var record = <T[]>response.json();

                return record;
            }));
    }
}