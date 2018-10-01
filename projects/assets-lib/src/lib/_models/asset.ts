import { AssetProperty, Notification, AssetTypeEnum, AssetTemplate, Identity } from './index';
import { Guid } from 'shared-comp-lib';

export class Asset implements Identity {

    id: Guid;
    networkTypeId: string;
    assetTypeId: AssetTypeEnum;
    assetSubTypeId: number;
    gisId: number;
    equipmentId: string;
    floc: string;

    properties: AssetProperty[];


    address: string;
    category: string;
    label: string;

    suburb: string;
    mtceZone: string;
    waspId: string;
    owner: string;


    lat: number;
    lon: number;



    notifications: Notification[];
    assetTemplate: AssetTemplate;
}