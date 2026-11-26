import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';

import { SearchBusStopSectionComponent } from './search-bus-stop-section.component';
import { createBusLinesResponse, createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { BUS_LINES_URL } from '../../../core/bus-lines/bus-lines.constants';
import { BUS_LINE_PATH } from '../../../app.routes.constants';

describe('SearchBusStopSectionComponent', () => {
  let component: SearchBusStopSectionComponent;
  let fixture: ComponentFixture<SearchBusStopSectionComponent>;

  const mockData = createBusLinesResponse({ lines: [createSuburbanBusLine()] });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBusStopSectionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBusStopSectionComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController).expectOne(BUS_LINES_URL).flush(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.search__input');
  }

  function getClearButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.search__clear');
  }

  function getResults(): string[] {
    return [...fixture.nativeElement.querySelectorAll('.search__dropdown li')].map((li: HTMLElement) => {
      const name = li.querySelector('.search__option-name');
      const town = li.querySelector('.search__option-town');
      return name && town ? `${name.textContent!.trim()} | ${town.textContent!.trim()}` : li.textContent!.trim();
    });
  }

  function type(value: string): void {
    getInput().value = value;
    getInput().dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('hides the clear button when the field is empty', () => {
    expect(getClearButton()).toBeNull();
  });

  it('shows the clear button after typing', () => {
    type('Stara');
    expect(getClearButton()).not.toBeNull();
  });

  it('clears the text, hides the button and keeps focus on click', () => {
    type('Stara');
    getClearButton()!.click();
    fixture.detectChanges();

    expect(getInput().value).toBe('');
    expect(getClearButton()).toBeNull();
    expect(document.activeElement).toBe(getInput());
  });

  it('shows no results list while nothing is typed', () => {
    expect(fixture.nativeElement.querySelector('.search__dropdown')).toBeNull();
  });

  it('lists matching bus stops once, even if they appear on several directions', () => {
    type('centar');
    expect(getResults()).toEqual(['Centar | Nova Pazova']);
  });

  it('matches town and bus stop name together', () => {
    type('nova pazova centar');
    expect(getResults()).toEqual(['Centar | Nova Pazova']);
  });

  it('matches without diacritics', () => {
    type('cirila');
    expect(getResults()).toEqual(['Ćirila i Metodija 1 - d | Stara Pazova']);
  });

  it('finds a bus stop typed with Serbian letters', () => {
    type('Ćirila');
    expect(getResults()).toEqual(['Ćirila i Metodija 1 - d | Stara Pazova']);
  });

  it('says so when nothing matches', () => {
    type('Beograd');
    expect(getResults()).toEqual(['Nema stajališta za „Beograd“']);
  });

  it('puts the chosen bus stop in the field and closes the dropdown', () => {
    type('stara');
    fixture.nativeElement.querySelector('.search__option').click();
    fixture.detectChanges();

    expect(getInput().value).toBe('Stara Pazova AS');
    expect(fixture.nativeElement.querySelector('.search__dropdown')).toBeNull();
  });

  it('enables the timetable button only after a bus stop is chosen', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn--primary');
    expect(button.disabled).toBeTrue();

    type('stara');
    expect(button.disabled).toBeTrue();

    fixture.nativeElement.querySelector('.search__option').click();
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('opens the timetable of the chosen bus stop', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const busLine = mockData.lines[0];
    const busStop = busLine.directions[0].busStops[0];

    type('stara');
    fixture.nativeElement.querySelector('.search__option').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.btn--primary').click();

    expect(router.navigate).toHaveBeenCalledWith(['/', BUS_LINE_PATH, busLine.number, busStop.id]);
  });

  it('opens the dropdown again when the text is changed after choosing', () => {
    type('stara');
    fixture.nativeElement.querySelector('.search__option').click();
    fixture.detectChanges();

    type('Stara Pazova');
    expect(fixture.nativeElement.querySelector('.search__dropdown')).not.toBeNull();
  });

  it('bolds the part of the bus stop name that matches the typed text', () => {
    type('cirila');
    const bold = fixture.nativeElement.querySelector('.search__option strong');
    expect(bold.textContent).toBe('Ćirila');
  });
});
