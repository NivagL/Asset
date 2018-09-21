import { assetProperty, notification, assetTypeEnum, assetTemplate } from './index';

export class asset {
    

    assetType:assetTypeEnum;
    subNo:string;
    label:string;
    category:string;
    gisId:number;
    address:string;
    suburb:string;
    mtceZone:string;
    waspId:string;
    owner:string;
    equipmentId:string;
  
    lat:number;
    lon:number;

    properties:assetProperty[];
    notifications:notification[];
    assetTemplate:assetTemplate;
}