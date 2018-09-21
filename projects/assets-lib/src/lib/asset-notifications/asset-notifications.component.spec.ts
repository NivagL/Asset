import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetNotificationsComponent } from './asset-notifications.component';

describe('AssetNotificationsComponent', () => {
  let component: AssetNotificationsComponent;
  let fixture: ComponentFixture<AssetNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
