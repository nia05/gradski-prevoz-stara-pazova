import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureScheduleComponent } from './departure-schedule.component';

describe('DepartureScheduleComponent', () => {
  let component: DepartureScheduleComponent;
  let fixture: ComponentFixture<DepartureScheduleComponent>;

  const departureTimes = ['05:00', '05:45', '06:30', '11:20', '12:10', '12:45'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureScheduleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('departureTimes', departureTimes);
    fixture.componentRef.setInput('currentTime', null);
    fixture.detectChanges();
  });

  function getTexts(selector: string): string[] {
    return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll(selector))
      .map(element => element.textContent?.trim() ?? '');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('groups the departures by hour', () => {
    expect(getTexts('.departure-schedule__hour')).toEqual(['05', '06', '11', '12']);
    expect(getTexts('.departure-schedule__time')).toEqual(departureTimes);
  });

  it('greys out past departures and highlights the next one for the current time', () => {
    fixture.componentRef.setInput('currentTime', '11:00');
    fixture.detectChanges();
    expect(getTexts('.departure-schedule__time--past')).toEqual(['05:00', '05:45', '06:30']);
    expect(getTexts('.departure-schedule__time--next')).toEqual(['11:20']);
  });

  it('shows a message when there are no departures', () => {
    fixture.componentRef.setInput('departureTimes', []);
    fixture.detectChanges();
    expect(getTexts('.departure-schedule__empty')).toEqual(['Ovog dana nema polazaka sa ovog stajališta.']);
  });
});
