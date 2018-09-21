import { Pipe, PipeTransform } from '@angular/core';

import { assetTemplate } from '../_models/index';

@Pipe({ name: 'assetProperty' })
export class AssetPropertyPipe implements PipeTransform {
    transform(value: any, template: assetTemplate) {

        if (!value)
            return;

        var propertyTemplate = template.properties.find(p => p.id == value);

        return propertyTemplate.name;
    }
}