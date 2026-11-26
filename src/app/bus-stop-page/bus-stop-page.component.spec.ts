import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BusStopPageComponent } from './bus-stop-page.component';
import {
  createBusLinesResponse,
  createDeparture,
  createDirection,
  createSuburbanBusLine,
  createTimetable,
} from '../core/bus-lines/bus-lines.generator';
import { BUS_LINES_URL } from '../core/bus-lines/bus-lines.constants';

describe('BusStopPageComponent', () => {
  let component: BusStopPageComponent;
  let fixture: ComponentFixture<BusStopPageComponent>;

  const wednesdayAtEleven = new Date(2026, 10, 25, 11, 0);
  const suburbanBusLine = createSuburbanBusLine();
  const busStop = suburbanBusLine.directions[0].busStops[0];
  const busLine = createSuburbanBusLine({
    directions: [
      createDirection({
        busStops: [busStop],
        timetable: createTimetable({
          weekday: [createDeparture({ times: ['12:10'] }), createDeparture({ times: ['05:00'] })],
          saturday: [createDeparture({ times: ['08:20'] })],
        }),
      }),
    ],
  });

  beforeEach(async () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(wednesdayAtEleven);

    await TestBed.configureTestingModule({
      imports: [BusStopPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopPageComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(BUS_LINES_URL)
      .flush(createBusLinesResponse({ lines: [busLine] }));
    fixture.componentRef.setInput('busLineNumber', String(busLine.number));
    fixture.componentRef.setInput('busStopId', busStop.id);
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function getDepartureTimes(): string[] {
    return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.departure-schedule__time'))
      .map(time => time.textContent?.trim() ?? '');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the departures of today from this bus stop in time order', () => {
    expect(fixture.nativeElement.querySelector('h5')?.textContent).toBe(busStop.name);
    expect(getDepartureTimes()).toEqual(['05:00', '12:10']);
  });

  it('highlights the next departure from now', () => {
    expect(fixture.nativeElement.querySelector('.departure-schedule__time--next')?.textContent?.trim()).toBe('12:10');
  });

  it('shows the departures of the chosen day', () => {
    fixture.nativeElement.querySelectorAll('.day-tabs__tab')[1].click();
    fixture.detectChanges();
    expect(getDepartureTimes()).toEqual(['08:20']);
    expect(fixture.nativeElement.querySelector('.departure-schedule__time--next')).toBeNull();
  });
});
