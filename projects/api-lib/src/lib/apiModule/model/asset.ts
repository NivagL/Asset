/**
 * Northpower.Asset.Service
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: edge
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AssetProperty } from './assetProperty';
import { Location } from './location';


export interface Asset { 
    id: string;
    clientId: number;
    location?: Location;
    address?: string;
    networkTypeId?: string;
    assetTypeId: string;
    assetSubTypeId: number;
    gisId: number;
    equipmentId?: string;
    floc?: string;
    objectType?: string;
    properties?: Array<AssetProperty>;
}
