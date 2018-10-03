import { DataTypeEnum } from './assetEnums';
import { Guid, Identity } from 'shared-comp-lib';

export class AssetTemplateProperty implements Identity {
    id:Guid;
    name:string;
    unit:string;
    type:DataTypeEnum;
}