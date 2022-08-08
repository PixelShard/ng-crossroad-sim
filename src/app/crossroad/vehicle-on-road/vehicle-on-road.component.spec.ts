import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOnRoadComponent } from './vehicle-on-road.component';

describe('VehicleOnRoadComponent', () => {
  let component: VehicleOnRoadComponent;
  let fixture: ComponentFixture<VehicleOnRoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleOnRoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOnRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
