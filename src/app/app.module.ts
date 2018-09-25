import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AssetsLibModule } from 'assets-lib';
import { SharedCompLibModule } from 'shared-comp-lib';
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
    AssetsLibModule,
    SharedCompLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
