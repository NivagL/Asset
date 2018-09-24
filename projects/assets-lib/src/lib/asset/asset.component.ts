import { Component, OnInit, Input } from '@angular/core';
import { AssetService } from '../_services/asset.service';
import { Asset, AssetTypeEnum } from '../_models/index';

@Component({
  selector: 'astlib-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  @Input() asset: Asset;

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    if (!this.asset) {
      this.assetService.fetchAssets(null).subscribe((result: Asset[]) => {
        this.asset = result[0];
      });
    }

     //TODO: remove template fetch - this is just here for now to test function
     this.assetService.fetchAssetTemplates();
  }
}
