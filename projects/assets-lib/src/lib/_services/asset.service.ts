import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { asset } from '../_models/index';


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
}
