import { Guid } from 'shared-comp-lib';
import { Identity, IGenericRepository } from "../_models";
import { Observable } from "rxjs";

export class GenericRepository<T extends Identity> implements IGenericRepository<T> {

    constructor(private database: IDBDatabase,
        private objectStoreName: string) { }
    
    getById(id: Guid): Observable<T> {
        return new Observable((observer) => {
            var transaction: IDBTransaction = this.database.transaction(this.objectStoreName, "readonly");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var request: IDBRequest = store.get(id.toString());
            console.log('Local repo request for type : ' + this.objectStoreName);
            request.onsuccess = function (event) {
                
                console.log('success request : ' + id);
                var req = event.target as IDBRequest;
                observer.next(req.result);                
            };

            request.onerror = function (event) {
                console.log(request.error.name);
                observer.error(new Error('Error in getById: ' + request.error.message));
            }
        });
    }

    getByIds(ids: Guid[]): Observable<T[]> {
        return new Observable((observer) => {

            var transaction: IDBTransaction = this.database.transaction(this.objectStoreName, "readonly");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var results: T[] = [];

            ids.forEach((value) => {
                store.get(value.toString()).onsuccess = (e) => {
                    var request = event.target as IDBRequest;
                    results.push(request.result);
                };
            });

            transaction.onerror = function (event) {
                console.log(transaction.error.name);

                observer.error(new Error('Error in getById: ' + transaction.error.message));
            }

            transaction.oncomplete = function (event) {
                console.log('complete get by ids');

                observer.next(results);
            }
        });
    }

    getAll() : Observable<T[]> {
        return new Observable((observer) => {
            var transaction: IDBTransaction = this.database.transaction(this.objectStoreName, "readonly");

            var store:any = transaction.objectStore(this.objectStoreName);

            var request: IDBRequest = store.getAll();
            console.log('Local repo request for type : ' + this.objectStoreName);
            request.onsuccess = function (event) {
                
                console.log('success request');
                var req = event.target as IDBRequest;
                observer.next(req.result);                
            };

            request.onerror = function (event) {
                console.log(request.error.name);
                observer.error(new Error('Error in getAll (local): ' + request.error.message));
            }
        });
    }

    addRecord(record: T): Observable<boolean> {
        return new Observable((observer) => {

            var transaction: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);
              
            var request = store.add(record, record.id.toString());

            request.onerror = function (event) {
                console.log("error : " + request.error.name);
                observer.error(new Error('Error in addRecord: ' + request.error.message));
            }

            request.onsuccess = function (event) {
                console.log("saved asset");
                observer.next(true);
            }
        });
    }

    updateRecord(record: T): Observable<boolean> {
        return new Observable((observer) => {
            var transaction: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var request = store.put(record, record.id.toString());

            request.onerror = function (event) {
                console.log("error : " + request.error.name);
                observer.error(new Error('Error in addRecord: ' + request.error.message));
            }

            request.onsuccess = function (event) {
                console.log("saved asset");
                observer.next(true);
            }
        });
    }

    deleteRecordById(id: Guid): Observable<boolean> {
        return new Observable((observer) => {

            var tx: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");
            var store: IDBObjectStore = tx.objectStore(this.objectStoreName);

            var request = store.delete(id.toString());

            request.onerror = function (event) {
                observer.error(new Error('Error in delete Record: ' + request.error.message));
            }

            request.onsuccess = function (event) {
                console.log("deleted asset: " + id.toString());
                observer.next(true);
            }

        });
    }

    deleteRecord(record: T) {
        return this.deleteRecordById(record.id);
    }

    findByIndex(indexName: string, lower, upper): Observable<T[]> {

        if (lower === '' && upper === '') { return; }

        var range: IDBKeyRange;

        if (lower !== '' && upper !== '') {
            range = IDBKeyRange.bound(lower, upper);
        } else if (lower === '') {
            range = IDBKeyRange.upperBound(upper);
        } else {
            range = IDBKeyRange.lowerBound(lower);
        }

        return new Observable((observer) => {
            var transaction: IDBTransaction = this.database.transaction([this.objectStoreName], "readonly");
            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);
            var index: IDBIndex = store.index(indexName);

            var request: IDBRequest = index.openCursor(range);
            var foundRecords: T[] = [];

            request.onsuccess = function (event) {
                var cursor = request.result;

                if (cursor) {
                    foundRecords.push(cursor.value);

                    cursor.continue();
                } else {
                    console.log("all entries found");
                }
            }
            transaction.onerror = function (event) {
                console.log(transaction.error.name);

                observer.error(new Error('Error in findByIndex: ' + transaction.error.message));
            }

            transaction.oncomplete = function (event) {
                console.log('complete find by index');

                observer.next(foundRecords);
            }
        });


    }
}