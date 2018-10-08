import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLibComponent } from './api-lib.component';

describe('ApiLibComponent', () => {
  let component: ApiLibComponent;
  let fixture: ComponentFixture<ApiLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
