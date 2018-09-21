import { Component, OnInit, Input } from '@angular/core';
import { AssetService } from '../_services/asset.service';
import { DialogHelper } from '../_helpers/dialog.helper';
import { asset } from '../_models/index';

@Component({
  selector: 'astlib-asset-accordion',
  templateUrl: './asset-accordion.component.html',
  styleUrls: ['./asset-accordion.component.css']
})
export class AssetAccordionComponent implements OnInit {

  @Input() assetList: string[];
  @Input() selectedAsset: string;

  assets: asset[];

  constructor(private assetService: AssetService, private _dialog: DialogHelper) { }

  ngOnInit() {

    this.assetService.fetchAssets(this.assetList).subscribe(result => {
      this.assets = result;
      console.log(result);
    });
  }


  createAsset() {
    var dialogRef = this._dialog.showCreateAsset();

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // do stuff with new asset
      }
    });
  }
}
