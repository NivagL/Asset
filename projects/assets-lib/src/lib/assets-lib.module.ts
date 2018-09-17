import { NgModule } from '@angular/core';
import { AssetsLibComponent } from './assets-lib.component';
import { AssetComponent } from './asset/asset.component';
import { AssetAccordionComponent } from './asset-accordion/asset-accordion.component';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  declarations: [AssetsLibComponent, AssetComponent, AssetAccordionComponent],
  exports: [AssetsLibComponent, AssetComponent, AssetAccordionComponent]
})
export class AssetsLibModule { }
