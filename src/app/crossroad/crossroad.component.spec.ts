import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossroadComponent } from './crossroad.component';

describe('CrossroadComponent', () => {
  let component: CrossroadComponent;
  let fixture: ComponentFixture<CrossroadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossroadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
