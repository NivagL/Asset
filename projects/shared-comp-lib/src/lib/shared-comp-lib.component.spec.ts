import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCompLibComponent } from './shared-comp-lib.component';

describe('SharedCompLibComponent', () => {
  let component: SharedCompLibComponent;
  let fixture: ComponentFixture<SharedCompLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCompLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCompLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
