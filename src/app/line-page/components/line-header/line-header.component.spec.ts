import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LineHeaderComponent } from './line-header.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { getBusLinePageName } from '../../../app.routes.page-names';

describe('LineHeaderComponent', () => {
  let component: LineHeaderComponent;
  let fixture: ComponentFixture<LineHeaderComponent>;

  const busLine = createSuburbanBusLine();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineHeaderComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLine', busLine);
    fixture.componentRef.setInput('isReturnDirection', false);
    fixture.componentRef.setInput('skippedBusStopNames', []);
    fixture.componentRef.setInput('routeChangeNewsId', null);
    fixture.detectChanges();
  });

  function getArrow(): HTMLImageElement {
    return fixture.nativeElement.querySelector('.page-header__arrow');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the bus line number and the towns of the bus line', () => {
    const header: HTMLElement = fixture.nativeElement;
    expect(header.querySelector('h5')?.textContent).toBe(getBusLinePageName(busLine.number));
    expect(header.querySelector('.page-header__value')?.textContent).toBe('Stara Pazova, Nova Pazova');
  });

  it('tells the parent to change direction when the button is clicked', () => {
    spyOn(component.directionChange, 'emit');
    fixture.nativeElement.querySelector('.icon-button').click();
    expect(component.directionChange.emit).toHaveBeenCalled();
  });

  it('turns the arrow to the left for the return direction', () => {
    expect(getArrow().classList).not.toContain('page-header__arrow--left');
    fixture.componentRef.setInput('isReturnDirection', true);
    fixture.detectChanges();
    expect(getArrow().classList).toContain('page-header__arrow--left');
  });

  it('names the last bus stop of the other direction in the change direction tooltip', () => {
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('.tooltip');
    expect(tooltip.textContent).toBe('Promeni smer ka Ćirila i Metodija 1 - d');
    fixture.componentRef.setInput('isReturnDirection', true);
    fixture.detectChanges();
    expect(tooltip.textContent).toBe('Promeni smer ka Centar');
  });

  it('shows the bus stop warning only when the bus skips bus stops', () => {
    expect(fixture.nativeElement.querySelector('app-bus-stop-warning')).toBeNull();
    fixture.componentRef.setInput('skippedBusStopNames', ['Centar']);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-bus-stop-warning')).not.toBeNull();
  });
});
