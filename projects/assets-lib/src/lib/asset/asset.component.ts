import { Component, OnInit, Input } from '@angular/core';
import { AssetService } from '../_services/asset.service';
import { asset } from '../_models/index';

@Component({
  selector: 'astlib-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  @Input() asset: asset;

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    if (!this.asset) {
      this.assetService.fetchAssets(null).subscribe((result: asset[]) => {
        this.asset = result[0];
      });
    }
  }
}
