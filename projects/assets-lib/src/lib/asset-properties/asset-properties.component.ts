import { Component, OnInit, Input } from '@angular/core';

import { Asset, AssetTemplate, AssetProperty, AssetTemplateProperty } from '../_models/index';
import { AssetService } from '../_services/asset.service';
import { DialogHelper } from '../_helpers/dialog.helper';

@Component({
  selector: 'astlib-asset-properties',
  templateUrl: './asset-properties.component.html',
  styleUrls: ['./asset-properties.component.css']
})
export class AssetPropertiesComponent implements OnInit {

  @Input() asset: Asset;

  assetTemplate: AssetTemplate;

  constructor(private _assetService: AssetService, private _dialog: DialogHelper) { }

  ngOnInit() {
    console.log(this.asset.assetTypeId);
    this._assetService.fetchAssetTemplate(this.asset.assetTypeId).subscribe((result: AssetTemplate) => {
      this.assetTemplate = result;
      console.log("fetching asset templates : " + result);
    });
  }

  updateProperty(property: AssetProperty) {

    if (!property.assetTemplateProperty) {
      var template: AssetTemplateProperty = this.assetTemplate.properties.find(t => t.id == property.templatePropertyId);
      property.assetTemplateProperty = template;
    }

    this._dialog.updateAssetProperty(property);
  }
}
