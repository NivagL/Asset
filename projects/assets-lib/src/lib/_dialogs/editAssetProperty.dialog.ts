import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AssetProperty, AssetTemplateProperty } from '../_models/index';
import {AssetService} from '../_services/asset.service';

@Component({
    selector: 'editAssetProperty.dialog',
    templateUrl: 'editAssetProperty.dialog.html'
    
})

export class EditAssetPropertyDialog implements OnInit {

    propertyName: string = "Create Asset";
    assetProperty: AssetProperty;
    propertyValue:string = "";

    constructor(public thisDialogRef:MatDialogRef<EditAssetPropertyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _assetService: AssetService) {

        console.log(this.propertyName);
        
        this.assetProperty = data.assetProperty;
        this.propertyName = this.assetProperty.assetTemplateProperty.name;
        this.propertyValue = this.assetProperty.value;
    }

    ngOnInit() {
       
    }

    updateValue() {
        this.assetProperty.value = this.propertyValue;
        this.thisDialogRef.close();
    }
}