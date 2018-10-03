import { Injectable } from '@angular/core';
import { Asset, AssetTemplate, Identity, IGenericRepository } from '../_models/index';
import { GenericRepository } from './GenericRepository';
import { HttpRepository } from './HttpRepository';
import { Observable } from 'rxjs';
import { NorthpowerConfig } from "shared-comp-lib";
import { Http } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class UnitOfWork {

    private assetRepository: IGenericRepository<Asset> = null;
    private assetTemplateRepository: IGenericRepository<AssetTemplate> = null;

    public db: IDBDatabase = null;

    databaseName: string = "myDb";
    dbVersion: number = 2;

    constructor(private config: NorthpowerConfig, private http: Http) {

    }

    AssetsRepository(): Observable<IGenericRepository<Asset>> {

        return this.fetchRepository<Asset>(this.assetRepository, "assets", "asset");
    }

    AssetsTemplateRepository(): Observable<IGenericRepository<AssetTemplate>> {

        return this.fetchRepository<AssetTemplate>(this.assetTemplateRepository, "assetTemplates", "assettemplate");
    }

    fetchRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string, url: string): Observable<IGenericRepository<T>> {
        if (this.config.isOfflineFirst) {
            return this.fetchLocalRepository(repo, objectStoreName);
        } else {
            return this.fetchOnlineRepository(repo, objectStoreName, url);
        }
    }

    fetchOnlineRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string, url: string): Observable<IGenericRepository<T>> {
        if (repo) {
            return new Observable((observer) => observer.next(repo));
        } else {
            return new Observable((observer) => {
                var repo = new HttpRepository<T>(objectStoreName, url, this.config, this.http);
                observer.next(repo);
            });
        }
    }

    fetchLocalRepository<T extends Identity>(repo: IGenericRepository<T>, objectStoreName: string): Observable<IGenericRepository<T>> {

        if (repo) {
            return new Observable((observer) => observer.next(repo));
        } else if (!this.db) {
            return new Observable((observer) =>

                this.openDatabase(this.databaseName, this.dbVersion, this.upgradeDatabase).subscribe((result) => {
                    this.db = result;
                    var repo = new GenericRepository<T>(this.db, objectStoreName);
                    observer.next(repo);

                }));
        } else {
            return new Observable((observer) => observer.next(new GenericRepository<T>(this.db, objectStoreName)));
        }
    }

    openDatabase(name: string, version: number, upgradeDBCallback): Observable<IDBDatabase> {
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

    upgradeDatabase(dbToUpgrade: IDBDatabase) {
        console.log("running onupgradeneeded");

        if (!dbToUpgrade.objectStoreNames.contains("assets")) {
            var store: IDBObjectStore = dbToUpgrade.createObjectStore("assets");

            store.createIndex('equipmentIdIDX', "equipmentId", { unique: true });
            store.createIndex('lat', 'lat', { unique: false });

            var store: IDBObjectStore = dbToUpgrade.createObjectStore("assetTemplates");
        }
    }
}