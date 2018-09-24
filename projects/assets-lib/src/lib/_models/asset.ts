import { AssetProperty, Notification, AssetTypeEnum, AssetTemplate } from './index';

export class Asset {
    

    assetType:AssetTypeEnum;
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

    properties:AssetProperty[];
    notifications:Notification[];
    assetTemplate:AssetTemplate;
}