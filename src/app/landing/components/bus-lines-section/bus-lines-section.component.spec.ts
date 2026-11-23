import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BusLinesSectionComponent } from './bus-lines-section.component';
import { createBusLinesResponse, createSuburbanBusLine, createUrbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { BUS_LINES_URL } from '../../../core/bus-lines/bus-lines.constants';

describe('BusLinesSectionComponent', () => {
  let component: BusLinesSectionComponent;
  let fixture: ComponentFixture<BusLinesSectionComponent>;

  const urbanBusLine = createUrbanBusLine();
  const suburbanBusLine = createSuburbanBusLine();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLinesSectionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLinesSectionComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(BUS_LINES_URL)
      .flush(createBusLinesResponse({ lines: [suburbanBusLine, urbanBusLine] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows urban bus lines in the first list and suburban bus lines in the second', () => {
    const [urbanList, suburbanList]: HTMLUListElement[] = fixture.nativeElement.querySelectorAll('.bus-lines');
    expect(urbanList.textContent).toContain(urbanBusLine.name);
    expect(urbanList.textContent).not.toContain(suburbanBusLine.name);
    expect(suburbanList.textContent).toContain(suburbanBusLine.name);
    expect(suburbanList.textContent).not.toContain(urbanBusLine.name);
  });
});
