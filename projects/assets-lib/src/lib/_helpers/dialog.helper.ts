import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAssetDialog } from '../_dialogs/index';


@Injectable({
    providedIn: 'root'
})
export class DialogHelper {

    constructor(private _dialog: MatDialog) { }

    /* showError(message: string) {
        let dialogRef = this._dialog.open(ErrorDialog, {
            data: { errorText: message }
        });
    } */

    showCreateAsset(): MatDialogRef<CreateAssetDialog, any> {
        let dialogRef = this._dialog.open(CreateAssetDialog, {
            data: { title: 'Create Asset' }
        });

        return dialogRef;
    }
}
