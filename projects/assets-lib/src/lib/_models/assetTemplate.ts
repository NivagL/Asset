import { assetTypeEnum, assetTemplateProperty } from './index';

export class assetTemplate {
    id:number;
    typeName:assetTypeEnum;
    properties:assetTemplateProperty[];
}