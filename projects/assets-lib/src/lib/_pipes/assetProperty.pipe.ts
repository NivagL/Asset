import { Pipe, PipeTransform } from '@angular/core';

import { AssetTemplate } from '../_models/index';

@Pipe({ name: 'assetNameFromTemplate' })
export class AssetPropertyPipe implements PipeTransform {
    transform(value: any, template: AssetTemplate) {

        if (!value)
            return;

        var propertyTemplate = template.properties.find(p => p.id == value);

        return propertyTemplate.name;
    }
}