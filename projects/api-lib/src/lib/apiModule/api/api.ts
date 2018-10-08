export * from './asset.service';
import { AssetService } from './asset.service';
export * from './assetProperty.service';
import { AssetPropertyService } from './assetProperty.service';
export * from './assetTemplate.service';
import { AssetTemplateService } from './assetTemplate.service';
export * from './assetTemplateProperty.service';
import { AssetTemplatePropertyService } from './assetTemplateProperty.service';
export const APIS = [AssetService, AssetPropertyService, AssetTemplateService, AssetTemplatePropertyService];
