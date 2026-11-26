import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { BusLinesService } from './bus-lines.service';
import { createBusLinesResponse } from './bus-lines.generator';
import { BUS_LINES_URL } from './bus-lines.constants';

describe('BusLinesService', () => {
  let service: BusLinesService;
  let http: HttpTestingController;

  const mockData = createBusLinesResponse();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BusLinesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('is empty before the JSON loads', () => {
    expect(service.lines()).toEqual([]);
    http.expectOne(BUS_LINES_URL);
  });

  it('loads data/lines.json once and exposes the lines', () => {
    http.expectOne(BUS_LINES_URL).flush(mockData);

    expect(service.lines()).toEqual(mockData.lines);
  });

  it('finds the first bus line that stops at a bus stop', () => {
    http.expectOne(BUS_LINES_URL).flush(mockData);
    const suburbanBusLine = mockData.lines[0];
    const busStopOnlyOnSuburbanBusLine = suburbanBusLine.directions[1].busStops[1];

    expect(service.findBusLineWithBusStop(busStopOnlyOnSuburbanBusLine.id)).toBe(suburbanBusLine);
    expect(service.findBusLineWithBusStop('beograd')).toBeUndefined();
  });
});
