import { Component, OnInit, Input } from '@angular/core';

import { asset, assetTemplate } from '../_models/index';
import { AssetService } from '../_services/asset.service';

@Component({
  selector: 'astlib-asset-properties',
  templateUrl: './asset-properties.component.html',
  styleUrls: ['./asset-properties.component.css']
})
export class AssetPropertiesComponent implements OnInit {

  @Input() asset: asset;
 
  assetTemplate: assetTemplate;

  constructor(private _assetService: AssetService) { }

  ngOnInit() {
    console.log(this.asset.assetType);
    this._assetService.fetchAssetTemplate(this.asset.assetType).subscribe((result: assetTemplate) => {
      this.assetTemplate = result;
      console.log(result);
    });
  }

}
