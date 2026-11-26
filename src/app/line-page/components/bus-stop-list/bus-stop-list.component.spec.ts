import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BusStopListComponent } from './bus-stop-list.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';

describe('BusStopListComponent', () => {
  let component: BusStopListComponent;
  let fixture: ComponentFixture<BusStopListComponent>;

  const busLine = createSuburbanBusLine();
  const busStops = busLine.directions[0].busStops;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopListComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLineNumber', busLine.number);
    fixture.componentRef.setInput('busStops', busStops);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a bus stop item for each bus stop', () => {
    const names = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.bus-stop-item__name'))
      .map(name => name.textContent);
    expect(names).toEqual(busStops.map(busStop => busStop.name));
  });
});
