import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BusLineItemComponent } from './bus-line-item.component';
import { createUrbanBusLine } from '../bus-lines/bus-lines.generator';
import { BUS_LINE_PATH } from '../../app.routes.constants';

describe('BusLineItemComponent', () => {
  let component: BusLineItemComponent;
  let fixture: ComponentFixture<BusLineItemComponent>;

  const busLine = createUrbanBusLine();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLineItemComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLineItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('busLineNumber', busLine.number);
    fixture.componentRef.setInput('busLineName', busLine.name);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the bus line number and name and links to the bus line page', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(link.textContent).toContain(String(busLine.number));
    expect(link.textContent).toContain(busLine.name);
    expect(link.getAttribute('href')).toBe(`/${BUS_LINE_PATH}/${busLine.number}`);
  });
});
