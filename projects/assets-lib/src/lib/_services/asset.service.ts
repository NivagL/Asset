import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { asset, assetTypeEnum, assetTemplate, assetProperty } from '../_models/index';


@Injectable({
    providedIn: 'root'
})
export class AssetService {

    constructor(private http: Http) { };

    fetchAssets(assetList: string[]): Observable<asset[]> {

        return this.http.get('assets/data/assets.json')
            .pipe(map((response: Response) => {
                var assets = <asset[]>response.json();

                if (!assetList)  // TODO: remove this and add dummy asset in test page
                    return assets;

                var filteredAssets = assets.filter(a => assetList.indexOf(a.equipmentId) >= 0);

                return filteredAssets;
            }));
    }

    fetchAssetTemplates(): Observable<assetTemplate[]> {

        return this.http.get('assets/data/assetTemplates.json')
            .pipe(map((response: Response) => {
                var assetTemplates = <assetTemplate[]>response.json();

                return assetTemplates;
            }));
    }

    fetchAssetTemplate(assetType: assetTypeEnum): Observable<assetTemplate> {
        console.log('finding template for ' + assetType)
        return this.http.get('assets/data/assetTemplates.json')
            .pipe(map((response: Response) => {
                var assetTemplates = <assetTemplate[]>response.json();

                var template = assetTemplates.find(t => t.typeName == assetType)
                return template;
            }));
    }

    // fetch asset object to create
    createNewAsset(assetType: assetTypeEnum): Observable<asset> {
        var newAsset = new asset();

        return this.fetchAssetTemplate(assetType).pipe(map((result: assetTemplate) => {
            var newAsset = new asset();
            newAsset.assetTemplate = result;
            newAsset.properties = [];

            for (var item in result.properties) {
                var newProperty = new assetProperty();
                newProperty.templatePropertyNumber = result.properties[item].id;

                newAsset.properties.push(newProperty);
            }

            return newAsset;
        }));
    }
}
