import { Guid } from '../utilities/Guid';
import { Identity } from '../_models/identity';
import { Observable } from 'rxjs';

export interface IGenericRepository<T extends Identity> {
    getById(id: Guid):Observable<T>;
    getByIds(ids:Guid[]):Observable<T[]>;
    getAll():Observable<T[]>;
    addRecord(record:T):Observable<boolean>;
    updateRecord(record:T):Observable<boolean>;
    deleteRecordById(id:Guid):Observable<boolean>;
    findByIndex(indexName: string, lower, upper): Observable<T[]>;
    search(searchObject:T);
}