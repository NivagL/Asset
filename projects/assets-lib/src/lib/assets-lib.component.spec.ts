import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsLibComponent } from './assets-lib.component';

describe('AssetsLibComponent', () => {
  let component: AssetsLibComponent;
  let fixture: ComponentFixture<AssetsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
