import { LocalRepository } from './LocalRepository';
import { HttpRepository } from './HttpRepository';
import { Observable } from 'rxjs';
import { NorthpowerConfig } from "../northpower.config";
import { Http } from '@angular/http';
import { Identity, IGenericRepository } from '../_models/index';

export abstract class RepositoryFactoryBase {

    protected db: IDBDatabase = null;

    protected databaseName: string;
    protected dbVersion: number;

    constructor(protected config: NorthpowerConfig, protected http: Http, protected dbName) {
        this.databaseName = dbName;
    }

    protected fetchRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string, url: string): Observable<IGenericRepository<T>> {
        if (this.config.isOfflineFirst) {
            return this.fetchLocalRepository(repo, objectStoreName);
        } else {
            return this.fetchOnlineRepository(repo, objectStoreName, url);
        }
    }

    protected fetchOnlineRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string, url: string): Observable<IGenericRepository<T>> {
        if (repo) {
            return new Observable((observer) => observer.next(repo));
        } else {
            return new Observable((observer) => {
                var repo = new HttpRepository<T>(objectStoreName, url, this.config, this.http);
                observer.next(repo);
            });
        }
    }

    protected fetchLocalRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string): Observable<IGenericRepository<T>> {

        if (repo) {
            return new Observable((observer) => observer.next(repo));
        } else if (!this.db) {
            return new Observable((observer) =>

                this.openDatabase(this.databaseName, this.dbVersion, this.upgradeDatabase).subscribe((result) => {
                    this.db = result;
                    var repo = new LocalRepository<T>(this.db, objectStoreName);
                    observer.next(repo);

                }));
        } else {
            return new Observable((observer) => observer.next(new LocalRepository<T>(this.db, objectStoreName)));
        }
    }

    protected openDatabase(name: string, version: number, upgradeDBCallback): Observable<IDBDatabase> {
        return new Observable((observer) => {
            var request: IDBOpenDBRequest = window.indexedDB.open(name, version);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => upgradeDBCallback(request.result);

            request.onerror = (event) => {
                var result: IDBRequest = event.target as IDBRequest;
                observer.error(new Error('error opening database: ' + result.error.name));
            }

            request.onsuccess = (event) => {
                observer.next(request.result);
            }
        });
    }

    protected abstract upgradeDatabase(dbToUpgrade: IDBDatabase): void;
}