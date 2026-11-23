import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { BusLinesService } from './bus-lines.service';
import { BusLinesResponse, BusLineType } from './bus-lines.model';
import { BUS_LINES_URL } from './bus-lines.constants';

describe('BusLinesService', () => {
  let service: BusLinesService;
  let http: HttpTestingController;

  const mockData = {
    lines: [
      { number: 1, name: 'Stara Pazova – Nova Pazova', type: BusLineType.Suburban, validFrom: '', registerNumber: 1, directions: [] },
      { number: 6, name: 'Gradska linija Stara Pazova', type: BusLineType.Urban, validFrom: '', registerNumber: 6, directions: [] },
    ],
  } as BusLinesResponse;

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

    expect(service.lines().length).toBe(2);
    expect(service.getLine(6)?.name).toBe('Gradska linija Stara Pazova');
    expect(service.getLine(99)).toBeUndefined();
  });
});
