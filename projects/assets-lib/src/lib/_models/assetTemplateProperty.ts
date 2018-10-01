import { DataTypeEnum } from './assetEnums';
import { Identity } from './index';
import { Guid } from 'shared-comp-lib/public_api';

export class AssetTemplateProperty implements Identity {
    id:Guid;
    name:string;
    unit:string;
    type:DataTypeEnum;
}