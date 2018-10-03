import { AssetTypeEnum, AssetTemplateProperty } from './index';
import { Guid, Identity } from 'shared-comp-lib';

export class AssetTemplate implements Identity {
    id:Guid;
    typeName:AssetTypeEnum;
    properties:AssetTemplateProperty[];
}