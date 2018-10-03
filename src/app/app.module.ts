import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AssetsLibModule } from 'assets-lib';
import { SharedCompLibModule, NorthpowerConfig, GlobalErrorHandler } from 'shared-comp-lib';
import { SingleAssetComponent } from './single-asset/single-asset.component';
import { MultipleAssetComponent } from './multiple-asset/multiple-asset.component';
import { ImageEditorExampleComponent } from './image-editor-example/image-editor-example.component';


const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'singleasset', component: SingleAssetComponent },
  { path: 'multipleasset', component: MultipleAssetComponent },
  { path: 'imageeditor', component: ImageEditorExampleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

const config: NorthpowerConfig = {
  env: environment,
  baseUrl:environment.baseUrl,
  test:"test string",
  isOfflineFirst:true
}

@NgModule({
  declarations: [
    AppComponent,
    SingleAssetComponent,
    MultipleAssetComponent,
    ImageEditorExampleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AssetsLibModule.forRoot(config),
    SharedCompLibModule,
  ],
  providers: [{provide:ErrorHandler, useClass:GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
