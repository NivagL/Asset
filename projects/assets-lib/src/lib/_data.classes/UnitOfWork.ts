import { Injectable } from '@angular/core';
import { Asset, AssetTemplate } from '../_models/index';
import { GenericRepository } from './GenericRepository';
import { resolve } from 'dns';

export class UnitOfWork {

    private assetRepository: GenericRepository<Asset> = null;
    private assetTemplateRepository: GenericRepository<AssetTemplate> = null;

    public db: IDBDatabase = null;

    constructor() {
        this.openDatabase("myDB", 1, this.upgradeDatabase).then((result) => this.db = result);
    }

    AssetsRepository(): GenericRepository<Asset> {
        if (!this.assetRepository) {
            this.openDatabase("myDB", 1, this.upgradeDatabase).then((result) =>
                this.assetRepository = new GenericRepository(result, "assets")
            );
        }

        return this.assetRepository;
    }

    AssetsTemplateRepository(): Promise<GenericRepository<AssetTemplate>> {
        return new Promise((resolve, reject) => {
            if (!this.assetTemplateRepository) {
                this.openDatabase("myDB", 1, this.upgradeDatabase).then((result) => {
                    this.assetTemplateRepository = new GenericRepository(result, "assetTemplates");
                    resolve(this.assetTemplateRepository);
                });
            }


        });
    }

    openDatabase(name: string, version: number, upgradeDBCallback): Promise<IDBDatabase> {
        return new Promise(function (resolve, reject) {
            var request: IDBOpenDBRequest = window.indexedDB.open(name, version);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => upgradeDBCallback(request.result);

            request.onerror = (event) => {
                var result: IDBRequest = event.target as IDBRequest;
                reject(new Error('error opening database: ' + result.error.name));
            }

            request.onsuccess = (event) => {
                resolve(request.result);
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