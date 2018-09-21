import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatExpansionModule, MatDialogModule, MatTabsModule, MatInputModule,
  MatButtonModule, MatAutocompleteModule } from '@angular/material';

import { AssetAccordionComponent } from './asset-accordion/asset-accordion.component';
import { AssetPropertiesComponent } from './asset-properties/asset-properties.component';
import { AssetNotificationsComponent } from './asset-notifications/asset-notifications.component';
import { AssetPropertyPipe } from './_pipes/assetProperty.pipe';
import { AssetComponent } from './asset/asset.component';
import { AssetsLibComponent } from './assets-lib.component';

import { CreateAssetDialog } from './_dialogs/createAsset.dialog';  

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatExpansionModule, MatTabsModule, MatDialogModule, MatButtonModule, MatAutocompleteModule, MatInputModule
  ],
  declarations: [
    AssetsLibComponent, AssetComponent, AssetAccordionComponent, AssetPropertiesComponent, 
    AssetNotificationsComponent, AssetPropertyPipe,
    CreateAssetDialog      
  ],
  exports: [AssetsLibComponent, AssetComponent, AssetAccordionComponent],
  entryComponents:[
    CreateAssetDialog
  ]
})
export class AssetsLibModule { }
