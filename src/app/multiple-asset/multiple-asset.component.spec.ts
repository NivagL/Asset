import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAssetComponent } from './multiple-asset.component';

describe('MultipleAssetComponent', () => {
  let component: MultipleAssetComponent;
  let fixture: ComponentFixture<MultipleAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
