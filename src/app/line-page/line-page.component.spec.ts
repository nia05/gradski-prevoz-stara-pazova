import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { LinePageComponent } from './line-page.component';
import { createBusLinesResponse, createDirection, createSuburbanBusLine, createUrbanBusLine } from '../core/bus-lines/bus-lines.generator';
import { DirectionCode } from '../core/bus-lines/bus-lines.model';
import { BUS_LINES_URL } from '../core/bus-lines/bus-lines.constants';

describe('LinePageComponent', () => {
  let component: LinePageComponent;
  let fixture: ComponentFixture<LinePageComponent>;

  const suburbanBusLine = createSuburbanBusLine();
  const urbanBusLine = createUrbanBusLine();
  const urbanBusLineWithSkippedBusStop = createUrbanBusLine({
    number: 7,
    directions: [createDirection({ code: DirectionCode.B, skippedBusStopIds: ['stara-pazova-stara-pazova-as'] })],
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinePageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinePageComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(BUS_LINES_URL)
      .flush(createBusLinesResponse({ lines: [suburbanBusLine, urbanBusLine, urbanBusLineWithSkippedBusStop] }));
  });

  function openBusLine(busLineNumber: number): void {
    fixture.componentRef.setInput('busLineNumber', String(busLineNumber));
    fixture.detectChanges();
  }

  function getBusStopNames(): string[] {
    return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.bus-stop-item__name'))
      .map(name => name.textContent ?? '');
  }

  function getChangeDirectionButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.icon-button');
  }

  it('should create', () => {
    openBusLine(suburbanBusLine.number);
    expect(component).toBeTruthy();
  });

  it('shows the bus line number, towns and bus stops of the first direction', () => {
    openBusLine(suburbanBusLine.number);
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('h5')?.textContent).toBe(`Linija ${suburbanBusLine.number}`);
    expect(page.querySelector('.page-header__value')?.textContent).toBe('Stara Pazova, Nova Pazova');
    expect(getBusStopNames()).toEqual(['Stara Pazova AS', 'Centar']);
  });

  it('shows the bus stops of the other direction after changing direction', () => {
    openBusLine(suburbanBusLine.number);
    getChangeDirectionButton()?.click();
    fixture.detectChanges();
    expect(getBusStopNames()).toEqual(['Centar', 'Ćirila i Metodija 1 - d']);
  });

  it('has no change direction button for a bus line with one direction', () => {
    openBusLine(urbanBusLine.number);
    expect(getChangeDirectionButton()).toBeNull();
  });

  it('warns about the skipped bus stop and greys it out in the list', () => {
    openBusLine(urbanBusLineWithSkippedBusStop.number);
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('.bus-stop-warning__text')?.textContent?.trim())
      .toBe('Autobus ne staje na stajalištu Stara Pazova AS.');
    expect(page.querySelectorAll('.bus-stop-item--skipped').length).toBe(1);
  });

  it('shows no warning when the bus stops at every bus stop', () => {
    openBusLine(suburbanBusLine.number);
    expect(fixture.nativeElement.querySelector('.bus-stop-warning')).toBeNull();
  });
});
