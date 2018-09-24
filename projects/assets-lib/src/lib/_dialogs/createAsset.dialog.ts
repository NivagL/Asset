import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Asset, AssetTypeEnum } from '../_models/index';
import { AssetService } from '../_services/asset.service';

@Component({
    selector: 'createAsset.dialog',
    templateUrl: 'createAsset.dialog.html',
    styleUrls: ['createAsset.dialog.css']
})

export class CreateAssetDialog implements OnInit {

    title: string = "Create Asset";
    asset: Asset = new Asset();
    assetType = [];
    newAsset: Asset = null;

    assetTypeControl = new FormControl();
    filteredAssetTypeOptions: Observable<string[]>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _assetService: AssetService) {
        if (data.title)
            this.title = data.title;
    }

    ngOnInit() {
        this.buildAssetTemplateDropDown();

        this.filteredAssetTypeOptions = this.assetTypeControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    // auto drop down methods 
    private _filter(value: string): string[] {
        if (typeof value != "string")
            return [];

        const filterValue = value.toLowerCase();

        return this.assetType.filter(types => types.value.toLowerCase().indexOf(filterValue) === 0);
    }

    getDisplayFn(val) {
        return (val) => this.display(val);
    }

    display(assetType): string {
        return assetType ? assetType.value : '';
    }

    buildAssetTemplateDropDown() {
        this.assetType = [];
        for (var enumMember in AssetTypeEnum) {
            if (!isNaN(parseInt(enumMember, 10))) {
                this.assetType.push({ key: enumMember, value: AssetTypeEnum[enumMember] });
            }
        }
    }
    // end auto drop down methods

    // based on template selected build the new asset with relevant properties
    buildAssetTemplate(selectedItem) {
        var templateType: AssetTypeEnum = selectedItem.key;

        this._assetService.createNewAsset(templateType).subscribe((result: Asset) => {
            if (result) {
                this.newAsset = result;
            }
        });
    }
}