import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Asset, AssetTypeEnum, AssetTemplate, AssetProperty } from '../_models/index';
import { UnitOfWork } from '../_data.classes/UnitOfWork';
import { GenericRepository } from '../_data.classes/GenericRepository';
import { Guid } from 'shared-comp-lib';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    _unitOfWork: UnitOfWork;
    _assetTemplateRepo: GenericRepository<AssetTemplate>;

    constructor(private http: Http) {
        this._unitOfWork = new UnitOfWork();
        this._unitOfWork.AssetsTemplateRepository().subscribe(result => this._assetTemplateRepo = result);
    };

    fetchAssetsTemplatesDB(id: Guid): Observable<AssetTemplate> {

        return new Observable((observer) => { 
            this._unitOfWork.AssetsTemplateRepository().subscribe(res => res.getById(id).subscribe((result) => {
            
                observer.next(result);
            }));
        
        });
    }

    fetchAssets(assetList: string[]): Observable<Asset[]> {

        return this.http.get('assets/data/assets.json')
            .pipe(map((response: Response) => {
                var assets = <Asset[]>response.json();

                if (!assetList)  // TODO: remove this and add dummy asset in test page
                    return assets;

                var filteredAssets = assets.filter(a => assetList.indexOf(a.equipmentId) >= 0);

                return filteredAssets;
            }));
    }

    fetchAssetTemplates(): Observable<AssetTemplate[]> {


        return this.http.get('https://localhost/api/assettemplate')
            .pipe(map((response: Response) => {
                var assetTemplates = <AssetTemplate[]>response.json();

                assetTemplates.forEach((template) => this._assetTemplateRepo.addRecord(template));

                return assetTemplates;
            }));
    }

    fetchAssetTemplate(assetType: AssetTypeEnum): Observable<AssetTemplate> {
        return this.fetchAssetsTemplatesDB(Guid.newGuid());


        console.log('finding template for ' + assetType)
        return this.http.get('https://localhost/api/assettemplate')
            .pipe(map((response: Response) => {
                var assetTemplates = <AssetTemplate[]>response.json();

                var template = assetTemplates.find(t => t.typeName == assetType)
                return template;
            }));
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
