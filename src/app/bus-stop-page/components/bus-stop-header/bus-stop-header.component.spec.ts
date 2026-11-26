import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BusStopHeaderComponent } from './bus-stop-header.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { TimetableDay } from '../../../core/bus-lines/bus-lines.model';
import { BUS_LINE_PATH } from '../../../app.routes.constants';

describe('BusStopHeaderComponent', () => {
  let component: BusStopHeaderComponent;
  let fixture: ComponentFixture<BusStopHeaderComponent>;

  const busLine = createSuburbanBusLine();
  const firstBusStop = busLine.directions[0].busStops[0];
  const busStopInBothDirections = busLine.directions[0].busStops[1];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopHeaderComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLine', busLine);
    fixture.componentRef.setInput('busStop', busStopInBothDirections);
    fixture.componentRef.setInput('isReturnDirection', false);
    fixture.componentRef.setInput('selectedDay', TimetableDay.Weekday);
    fixture.detectChanges();
  });

  function getChangeDirectionButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.icon-button');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the bus stop name and town and links back to the bus line', () => {
    const header: HTMLElement = fixture.nativeElement;
    expect(header.querySelector('h5')?.textContent).toBe(busStopInBothDirections.name);
    expect(header.querySelector('.page-header__value')?.textContent).toBe(busStopInBothDirections.town);
    const busLineLink = header.querySelectorAll('.breadcrumb__link')[1];
    expect(busLineLink.getAttribute('href')).toBe(`/${BUS_LINE_PATH}/${busLine.number}`);
  });

  it('marks the selected day tab and tells the parent when another day is chosen', () => {
    spyOn(component.dayChange, 'emit');
    const tabs: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.day-tabs__tab'));
    expect(tabs[0].classList).toContain('day-tabs__tab--selected');
    tabs[1].click();
    expect(component.dayChange.emit).toHaveBeenCalledWith(TimetableDay.Saturday);
  });

  it('offers a direction change only when the bus stop is in the other direction too', () => {
    expect(getChangeDirectionButton()).not.toBeNull();
    fixture.componentRef.setInput('busStop', firstBusStop);
    fixture.detectChanges();
    expect(getChangeDirectionButton()).toBeNull();
  });
});
