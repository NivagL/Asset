import { AssetTypeEnum, AssetTemplateProperty, Identity } from './index';
import { Guid } from 'shared-comp-lib';

export class AssetTemplate implements Identity {
    id:Guid;
    typeName:AssetTypeEnum;
    properties:AssetTemplateProperty[];
}