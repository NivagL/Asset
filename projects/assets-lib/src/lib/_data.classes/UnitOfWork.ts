import { Injectable } from '@angular/core';
import { Asset, AssetTemplate, Identity } from '../_models/index';
import { GenericRepository } from './GenericRepository';
import { resolve } from 'dns';
import { Observable, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UnitOfWork {

    private assetRepository: GenericRepository<Asset> = null;
    private assetTemplateRepository: GenericRepository<AssetTemplate> = null;

    public db: IDBDatabase = null;

    databaseName: string = "myDb";
    dbVersion: number = 2;

    constructor() {
      //  this.openDatabase("myDB", 1, this.upgradeDatabase).subscribe((result) => this.db = result);
    }

    AssetsRepository(): Observable<GenericRepository<Asset>> {
        
        return this.fetchRepository<Asset>(this.assetRepository, "assets");
    }

    AssetsTemplateRepository(): Observable<GenericRepository<AssetTemplate>> {

        return this.fetchRepository<AssetTemplate>(this.assetTemplateRepository, "assetTemplates");
    }

    fetchRepository<T extends Identity>(repo: GenericRepository<T>, objectStoreName: string): Observable<GenericRepository<T>> {

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