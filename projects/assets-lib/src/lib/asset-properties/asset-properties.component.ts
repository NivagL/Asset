import { Component, OnInit, Input } from '@angular/core';

import { Asset, AssetTemplate } from '../_models/index';
import { AssetService } from '../_services/asset.service';

@Component({
  selector: 'astlib-asset-properties',
  templateUrl: './asset-properties.component.html',
  styleUrls: ['./asset-properties.component.css']
})
export class AssetPropertiesComponent implements OnInit {

  @Input() asset: Asset;
 
  assetTemplate: AssetTemplate;

  constructor(private _assetService: AssetService) { }

  ngOnInit() {
    console.log(this.asset.assetType);
    this._assetService.fetchAssetTemplate(this.asset.assetType).subscribe((result: AssetTemplate) => {
      this.assetTemplate = result;
      console.log(result);
    });
  }

}
