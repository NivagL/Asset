import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAccordionComponent } from './asset-accordion.component';

describe('AssetAccordionComponent', () => {
  let component: AssetAccordionComponent;
  let fixture: ComponentFixture<AssetAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
