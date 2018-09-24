import { Pipe, PipeTransform } from '@angular/core';

import { AssetTemplate, AssetProperty, AssetTemplateProperty } from '../_models/index';

@Pipe({ name: 'displayPropertyValue' })
export class DisplayPropertyValuePipe implements PipeTransform {
    transform(value: string, property:AssetProperty, template:AssetTemplate) {

        if (!value)
            return;

        var propertyTemplate = template.properties.find(p => p.id == property.templatePropertyId);    

        // format string if required i.e. for dates
        switch (propertyTemplate.type){
            case 4:
                var dateValue = new Date(value);
                value = dateValue.toLocaleDateString("en-NZ");
            break;            
        }

        return value;
    }
}