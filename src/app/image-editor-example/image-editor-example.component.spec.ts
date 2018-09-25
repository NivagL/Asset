import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorExampleComponent } from './image-editor-example.component';

describe('ImageEditorExampleComponent', () => {
  let component: ImageEditorExampleComponent;
  let fixture: ComponentFixture<ImageEditorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageEditorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
