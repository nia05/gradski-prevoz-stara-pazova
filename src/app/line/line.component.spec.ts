import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { LineComponent } from './line.component';
import { createBusLinesResponse, createSuburbanBusLine, createUrbanBusLine } from '../core/bus-lines/bus-lines.generator';
import { BUS_LINES_URL } from '../core/bus-lines/bus-lines.constants';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  const suburbanBusLine = createSuburbanBusLine();
  const urbanBusLine = createUrbanBusLine();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(BUS_LINES_URL)
      .flush(createBusLinesResponse({ lines: [suburbanBusLine, urbanBusLine] }));
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
    expect(page.querySelector('.bus-line-header__value')?.textContent).toBe('Stara Pazova, Nova Pazova');
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

  it('shows the town next to each bus stop on a suburban bus line', () => {
    openBusLine(suburbanBusLine.number);
    expect(fixture.nativeElement.querySelectorAll('.bus-stop-item__town').length).toBe(2);
  });

  it('does not show the town next to bus stops on an urban bus line', () => {
    openBusLine(urbanBusLine.number);
    expect(fixture.nativeElement.querySelectorAll('.bus-stop-item__town').length).toBe(0);
  });
});
