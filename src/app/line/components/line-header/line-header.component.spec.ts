import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LineHeaderComponent } from './line-header.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';

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
    fixture.detectChanges();
  });

  function getArrow(): HTMLImageElement {
    return fixture.nativeElement.querySelector('.line-header__arrow');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the bus line number and the towns of the bus line', () => {
    const header: HTMLElement = fixture.nativeElement;
    expect(header.querySelector('h5')?.textContent).toBe(`Linija ${busLine.number}`);
    expect(header.querySelector('.line-header__value')?.textContent).toBe('Stara Pazova, Nova Pazova');
  });

  it('tells the parent to change direction when the button is clicked', () => {
    spyOn(component.directionChange, 'emit');
    fixture.nativeElement.querySelector('.icon-button').click();
    expect(component.directionChange.emit).toHaveBeenCalled();
  });

  it('turns the arrow to the left for the return direction', () => {
    expect(getArrow().classList).not.toContain('line-header__arrow--left');
    fixture.componentRef.setInput('isReturnDirection', true);
    fixture.detectChanges();
    expect(getArrow().classList).toContain('line-header__arrow--left');
  });
});
