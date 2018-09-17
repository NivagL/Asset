import { Component, OnInit, Input } from '@angular/core';
import { AssetService } from '../_services/asset.service';
import { asset } from '../_models/index';

@Component({
  selector: 'astlib-asset-accordion',
  templateUrl: './asset-accordion.component.html',
  styleUrls: ['./asset-accordion.component.css']
})
export class AssetAccordionComponent implements OnInit {

@Input() assetList: string[];
@Input() selectedAsset: string;

 assets:asset[];

  constructor(private assetService:AssetService) { }

  ngOnInit() {
    
    this.assetService.fetchAssets(this.assetList).subscribe(result => {
      this.assets = result;
      console.log(result);
    });
  }
}
