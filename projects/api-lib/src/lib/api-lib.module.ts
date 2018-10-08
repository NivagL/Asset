import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './apiModule/configuration';
import { HttpClient } from '@angular/common/http';

import { AssetService } from './apiModule/api/asset.service';
import { AssetPropertyService } from './apiModule/api/assetProperty.service';
import { AssetTemplateService } from './apiModule/api/assetTemplate.service';
import { AssetTemplatePropertyService } from './apiModule/api/assetTemplateProperty.service';


@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [],
  providers: [
    AssetService,
    AssetPropertyService,
    AssetTemplateService,
    AssetTemplatePropertyService ]
})
export class ApiLibModule { 


    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiLibModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiLibModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }

}
