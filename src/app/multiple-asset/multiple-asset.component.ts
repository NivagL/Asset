import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-multiple-asset',
  templateUrl: './multiple-asset.component.html',
  styleUrls: ['./multiple-asset.component.css']
})
export class MultipleAssetComponent implements OnInit {

  selectedAssets: string[];
  selectedAsset: string;

  constructor() { 
   
   }

  ngOnInit() {

    this.selectedAsset = "IE000000000013284145";
    this.selectedAssets = [];

    this.selectedAssets.push("2");
    this.selectedAssets.push("IE000000000013284145");

  }
}
