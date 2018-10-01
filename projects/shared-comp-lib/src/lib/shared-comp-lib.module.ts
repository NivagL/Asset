import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatIconModule,
} from '@angular/material';

import { ImageEditorComponent } from './image-editor/image-editor.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule,MatIconModule
  ],
  declarations: [ImageEditorComponent],
  exports: [ImageEditorComponent]
})
export class SharedCompLibModule { }
