import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LineHeaderComponent } from './line-header.component';
import { createDirection, createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { DirectionCode } from '../../../core/bus-lines/bus-lines.model';
import { getBusLinePageName } from '../../../app.routes.page-names';
import { IconPath } from '../../../shared/icon-path.model';

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
    fixture.componentRef.setInput('isMapVisible', false);
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
    expect(tooltip.textContent).toBe('Promeni smer ka Ćirila i Metodija 1');
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

  function getMapButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelectorAll('.icon-button')[1];
  }

  it('offers the map of a bus line that has one and switches its icon to the list while the map is open', () => {
    spyOn(component.mapVisibilityChange, 'emit');
    expect(getMapButton().querySelector('img')?.getAttribute('src')).toBe(IconPath.Map);
    getMapButton().click();
    expect(component.mapVisibilityChange.emit).toHaveBeenCalled();

    fixture.componentRef.setInput('isMapVisible', true);
    fixture.detectChanges();
    expect(getMapButton().querySelector('img')?.getAttribute('src')).toBe(IconPath.List);
  });

  it('has no map button when the shown direction has no map', () => {
    fixture.componentRef.setInput('busLine', createSuburbanBusLine({ directions: [createDirection(), createDirection({ code: DirectionCode.B })] }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.icon-button').length).toBe(1);
  });
});
