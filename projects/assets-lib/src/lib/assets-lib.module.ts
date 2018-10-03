import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatExpansionModule, MatDialogModule, MatTabsModule, MatInputModule,
  MatButtonModule, MatAutocompleteModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule
} from '@angular/material';

import { AssetAccordionComponent } from './asset-accordion/asset-accordion.component';
import { AssetPropertiesComponent } from './asset-properties/asset-properties.component';
import { AssetNotificationsComponent } from './asset-notifications/asset-notifications.component';
import { AssetPropertyPipe } from './_pipes/assetProperty.pipe';
import { DisplayPropertyValuePipe } from './_pipes/displayPropetyValue.pipe';
import { AssetComponent } from './asset/asset.component';
import { EditAssetPropertyDialog } from './_dialogs/editAssetProperty.dialog';
import { SharedCompLibModule, NorthpowerConfig } from 'shared-comp-lib';

import { CreateAssetDialog } from './_dialogs/createAsset.dialog';


@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatExpansionModule, MatTabsModule, MatDialogModule, MatButtonModule, MatAutocompleteModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule, MatCheckboxModule,
    SharedCompLibModule
  ],
  declarations: [
    AssetComponent, AssetAccordionComponent, AssetPropertiesComponent,
    AssetNotificationsComponent, AssetPropertyPipe, DisplayPropertyValuePipe,
    CreateAssetDialog, EditAssetPropertyDialog
  ],
  exports: [AssetComponent, AssetAccordionComponent],
  entryComponents: [
    CreateAssetDialog,
    EditAssetPropertyDialog
  ]
})
export class AssetsLibModule { 
  constructor (@Optional() @SkipSelf() parentModule: AssetsLibModule) {
    if (parentModule) {
      throw new Error(
        'AssetsLibModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: NorthpowerConfig): ModuleWithProviders {
    return {
      ngModule: AssetsLibModule,
      providers: [
        {provide: NorthpowerConfig, useValue: config }
      ]
    };
  }
}
