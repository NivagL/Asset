import { promise } from "protractor";
import { PromiseState } from "q";
import { Guid } from 'shared-comp-lib';
import { Identity } from "../_models";

export class GenericRepository<T extends Identity>  {

    constructor(private database: IDBDatabase,
        private objectStoreName: string) { }

    getById(id: Guid): Promise<T> {

        return new Promise((resolve, reject) => {

            var transaction: IDBTransaction = this.database.transaction(this.objectStoreName, "readonly");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var request: IDBRequest = store.get(id.toString());

            request.onsuccess = function (event) {
                console.log('making request : ' + id);
                var req = event.target as IDBRequest;
                resolve(req.result);
            };

            request.onerror = function (event) {
                console.log(request.error.name);
                reject(new Error('Error in getById: ' + request.error.message));
            }
        });
    }

    getByIds(ids: Guid[]): Promise<T[]> {
        return new Promise((resolve, reject) => {

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

                reject(new Error('Error in getById: ' + transaction.error.message));
            }

            transaction.oncomplete = function (event) {
                console.log('complete get by ids');

                resolve(results);
            }
        });
    }

    addRecord(record: T): Promise<boolean> {
        return new Promise((resolve, reject) => {

            var transaction: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var request = store.add(record, record.id.toString());

            request.onerror = function (event) {
                console.log("error : " + request.error.name);
                reject(new Error('Error in addRecord: ' + request.error.message));
            }

            request.onsuccess = function (event) {
                console.log("saved asset");
                resolve(true);
            }
        });
    }

    updateRecord(record: T): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var transaction: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");

            var store: IDBObjectStore = transaction.objectStore(this.objectStoreName);

            var request = store.put(record, record.id.toString());

            request.onerror = function (event) {
                console.log("error : " + request.error.name);
                reject(new Error('Error in addRecord: ' + request.error.message));
            }

            request.onsuccess = function (event) {
                console.log("saved asset");
                resolve(true);
            }
        });
    }

    deleteRecordById(id: Guid): Promise<void> {
        return new Promise((resolve, reject) => {

            var tx: IDBTransaction = this.database.transaction([this.objectStoreName], "readwrite");
            var store: IDBObjectStore = tx.objectStore(this.objectStoreName);

            var requst = store.delete(id.toString());
        });
    }

    deleteRecord(record: T) {
        return this.deleteRecordById(record.id);
    }

    findByIndex(indexName: string, lower, upper): Promise<T[]> {

        if (lower === '' && upper === '') { return; }

        var range: IDBKeyRange;

        if (lower !== '' && upper !== '') {
            range = IDBKeyRange.bound(lower, upper);
        } else if (lower === '') {
            range = IDBKeyRange.upperBound(upper);
        } else {
            range = IDBKeyRange.lowerBound(lower);
        }

        return new Promise((resolve, reject) => {
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

                reject(new Error('Error in findByIndex: ' + transaction.error.message));
            }

            transaction.oncomplete = function (event) {
                console.log('complete find by index');

                resolve(foundRecords);
            }
        });


    }
}