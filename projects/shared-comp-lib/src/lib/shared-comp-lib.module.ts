import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedCompLibComponent } from './shared-comp-lib.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [SharedCompLibComponent, ImageEditorComponent],
  exports: [ImageEditorComponent]
})
export class SharedCompLibModule { }
