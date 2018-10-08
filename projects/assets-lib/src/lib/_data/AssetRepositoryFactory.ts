import { Injectable } from '@angular/core';
import { Asset, AssetTemplate } from '../_models/index';
import { Observable } from 'rxjs';
import { NorthpowerConfig, IGenericRepository, RepositoryFactoryBase } from "shared-comp-lib";
import { Http } from '@angular/http';
import { AssetService, AssetTemplateService } from 'api-lib';

@Injectable({
    providedIn: 'root'
})
export class AssetRepositoryFactory extends RepositoryFactoryBase {

    private assetRepository: IGenericRepository<Asset>;
    private assetTemplateRepository: IGenericRepository<AssetTemplate>;

    constructor(protected config: NorthpowerConfig, protected http: Http,
        protected assetService:AssetService, protected _assetTemplateService: AssetTemplateService) {
        super(config, http, "assetsDB");
    }

    AssetsRepository(): Observable<IGenericRepository<Asset>> {
        return this.fetchRepository<Asset>(this.assetRepository, "assets", "asset", this.assetService);
    }

    AssetsTemplateRepository(): Observable<IGenericRepository<AssetTemplate>> {

        return this.fetchRepository<AssetTemplate>(this.assetTemplateRepository, "assetTemplates", "assetTemplate", this._assetTemplateService);
    }

    protected upgradeDatabase(dbToUpgrade: IDBDatabase): void {
        console.log("running onupgradeneeded");

        if (!dbToUpgrade.objectStoreNames.contains("assets")) {
            var store: IDBObjectStore = dbToUpgrade.createObjectStore("assets");

            store.createIndex('equipmentIdIDX', "equipmentId", { unique: true });
            store.createIndex('lat', 'lat', { unique: false });

            var store: IDBObjectStore = dbToUpgrade.createObjectStore("assetTemplates");
        }
    }
}