import { AssetTypeEnum, AssetTemplateProperty } from './index';

export class AssetTemplate {
    id:number;
    typeName:AssetTypeEnum;
    properties:AssetTemplateProperty[];
}