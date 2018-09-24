import { AssetTemplateProperty } from './assetTemplateProperty';

export class AssetProperty {
    id: number;
    value: string;
    templatePropertyId: number;

    // should not to come from service this is assigned when required in the ts file eg: createAsset.dialog
    assetTemplateProperty: AssetTemplateProperty;

    // date functions to allow date elements to work directly with date types not strings
    private _dateValue: Date = null;

    get dateValue(): Date {
        if (this._dateValue != null || this._dateValue == null && !this.value) {
            return this._dateValue;
        }
        else {
            this._dateValue = new Date(this.value);
            return this.dateValue;
        }
    }

    set dateValue(setValue: Date) {
        this._dateValue = setValue;
        this.value = JSON.stringify(setValue);
    }

    // bool functions to allow booleans to work on checkbox elements
    private _boolValue: boolean = null;

    get boolValue(): boolean {
        if (this._boolValue != null) {
            return this._boolValue;
        }
        else if (!this.value) {
            this._boolValue = false;
        }
        else {
            this._boolValue = this.value === 'true';
        }

        return this._boolValue;
    }

    set boolValue(setValue: boolean) {
        this._boolValue = setValue;
        this.value = JSON.stringify(setValue);
    }

}