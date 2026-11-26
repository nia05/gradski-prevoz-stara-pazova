import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BusStopItemComponent } from './bus-stop-item.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { BUS_LINE_PATH } from '../../../app.routes.constants';

describe('BusStopItemComponent', () => {
  let component: BusStopItemComponent;
  let fixture: ComponentFixture<BusStopItemComponent>;

  const busLine = createSuburbanBusLine();
  const busStop = busLine.directions[0].busStops[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopItemComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLineNumber', busLine.number);
    fixture.componentRef.setInput('busStopId', busStop.id);
    fixture.componentRef.setInput('busStopName', busStop.name);
    fixture.componentRef.setInput('busStopTown', busStop.town);
    fixture.componentRef.setInput('isSkipped', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the bus stop name and town and links to the bus stop page of this bus line', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(link.querySelector('.bus-stop-item__name')?.textContent).toBe(busStop.name);
    expect(link.querySelector('.bus-stop-item__town')?.textContent).toBe(busStop.town);
    expect(link.getAttribute('href')).toBe(`/${BUS_LINE_PATH}/${busLine.number}/${busStop.id}`);
  });

  it('shows a skipped bus stop greyed out and without a link', () => {
    fixture.componentRef.setInput('isSkipped', true);
    fixture.detectChanges();
    const item: HTMLElement = fixture.nativeElement;
    expect(item.querySelector('a')).toBeNull();
    expect(item.querySelector('.bus-stop-item--skipped .bus-stop-item__name')?.textContent).toBe(busStop.name);
  });
});
