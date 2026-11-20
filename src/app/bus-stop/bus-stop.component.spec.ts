import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopComponent } from './bus-stop.component';

describe('BusStopComponent', () => {
  let component: BusStopComponent;
  let fixture: ComponentFixture<BusStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('broj', '1');
    fixture.componentRef.setInput('stanicaId', 'stara-pazova-stara-pazova-as');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
