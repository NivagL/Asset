import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Asset, AssetTypeEnum, AssetTemplate, AssetProperty } from '../_models/index';
import { AssetRepositoryFactory } from '../_data/AssetRepositoryFactory';
import { Guid, NorthpowerConfig } from 'shared-comp-lib';


@Injectable({
    providedIn: 'root'
})
export class AssetService {

    assetTemplates: AssetTemplate[] = null;

    constructor(private http: Http, private _assetFactory: AssetRepositoryFactory, private config: NorthpowerConfig) {

        console.log('is offline first = ' + config.isOfflineFirst);

        // put dummy data into indexeddby
        if (config.isOfflineFirst) {
            console.log('adding dummy data');
            this.buildDummyDataForOffline();
        }

    };

    buildDummyDataForOffline() {
        this.fetchAssets(null).subscribe(result => {
            if (!result || result.length == 0) {
                this.http.get('assets/data/assets.json')
                    .pipe(map((response: Response) => {
                        var assets = <Asset[]>response.json();
                        this._assetFactory.AssetsRepository().subscribe(result => {
                            assets.forEach(a => {
                                a.id = Guid.newGuid(); 
                                result.addRecord(a).subscribe();
                            });
                        });
                    })).subscribe();
            }
        });

        this.fetchAssetTemplates().subscribe(result => {
            if (!result || result.length == 0) {
                this.http.get('assets/data/assetTemplates.json')
                .pipe(map((response:Response) => {
                    var assettemplatess = <AssetTemplate[]>response.json();
                    this._assetFactory.AssetsTemplateRepository().subscribe(result => {
                        assettemplatess.forEach(a => {
                           // a.id = Guid.newGuid();
                            result.addRecord(a).subscribe();
                        });
                    });
                })).subscribe();
            }
        });
    }


    fetchAssets(assetList: string[]): Observable<Asset[]> {
        // for test purposes until more data available get all from service
        return new Observable((observer) => {
            this._assetFactory.AssetsRepository().subscribe(result => result.getAll().subscribe((result) => observer.next(result)));
        });
    }

    fetchAssetTemplates(): Observable<AssetTemplate[]> {

        return new Observable((observer) => {
            if (this.assetTemplates) {
                observer.next(this.assetTemplates);
            } else {
                this._assetFactory.AssetsTemplateRepository().subscribe(res =>
                    res.getAll().subscribe((result) => {
                        this.assetTemplates = result;
                        observer.next(result);
                    }))
            }
        });
    }

    fetchAssetTemplate(assetType: AssetTypeEnum): Observable<AssetTemplate> {

        return new Observable((observer) => {
            if (this.assetTemplates) {
                observer.next(this.assetTemplates.find(template => template.typeName == assetType));
            } else {
                this.fetchAssetTemplates().subscribe((result) => result.find(template => template.typeName == assetType));
            }
        });
    }

    // fetch asset object to create
    createNewAsset(assetType: AssetTypeEnum): Observable<Asset> {
        var newAsset = new Asset();

        return this.fetchAssetTemplate(assetType).pipe(map((result: AssetTemplate) => {
            var newAsset = new Asset();
            newAsset.assetTemplate = result;
            newAsset.properties = [];

            for (var item in result.properties) {
                var newProperty = new AssetProperty();
                newProperty.templatePropertyId = result.properties[item].id;
                newProperty.assetTemplateProperty = result.properties[item];
                newAsset.properties.push(newProperty);
            }

            return newAsset;
        }));
    }
}
