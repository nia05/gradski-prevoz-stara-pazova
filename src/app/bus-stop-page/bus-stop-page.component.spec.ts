import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopPageComponent } from './bus-stop-page.component';

describe('BusStopPageComponent', () => {
  let component: BusStopPageComponent;
  let fixture: ComponentFixture<BusStopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopPageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLineNumber', '1');
    fixture.componentRef.setInput('busStopId', 'stara-pazova-stara-pazova-as');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
