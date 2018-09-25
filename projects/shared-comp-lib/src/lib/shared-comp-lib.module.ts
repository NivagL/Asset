import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule
} from '@angular/material';

import { SharedCompLibComponent } from './shared-comp-lib.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule
  ],
  declarations: [SharedCompLibComponent, ImageEditorComponent],
  exports: [ImageEditorComponent]
})
export class SharedCompLibModule { }
