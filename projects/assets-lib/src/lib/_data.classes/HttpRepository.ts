import { Guid, NorthpowerConfig } from 'shared-comp-lib';
import { Identity, IGenericRepository } from "../_models";
import { Observable, empty } from "rxjs";
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

export class HttpRepository<T extends Identity> implements IGenericRepository<T> {

    _httpUrl: string;

    constructor(private objectStoreName: string, private url: string, private config: NorthpowerConfig, private http: Http) {
        this._httpUrl = config.baseUrl + url;

        console.log('http repo constructor    ' + objectStoreName );
        console.log('url = ' + this._httpUrl);
    }

    getById(id: Guid): Observable<T> {        
        return this.http.get(this._httpUrl + "/" + id)
            .pipe(map((response: Response) => {
                var record = <T>response.json();
                
                return record;
            }));
    }
    getByIds(ids: Guid[]): Observable<T[]> {       
        return empty();
    }    
    getAll():Observable<T[]> {
        return this.http.get(this._httpUrl)
            .pipe(map((response: Response) => {
                var records = <T[]>response.json();
                
                return records;
            }));
    }
    addRecord(record: T): Observable<boolean> {
        return empty();
    }
    updateRecord(record: T): Observable<boolean> {
        return empty();
    }
    deleteRecordById(id: Guid): Observable<boolean> {
        return empty();
    }
    findByIndex(indexName: string, lower, upper): Observable<T[]> {
        return empty();
    }
}