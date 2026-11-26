import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLineMapComponent } from './bus-line-map.component';
import { createSuburbanBusLine } from '../../../core/bus-lines/bus-lines.generator';
import { GOOGLE_MY_MAPS_EMBED_URL } from '../../../core/bus-lines/bus-lines.constants';
import { getBusLinePageName } from '../../../app.routes.page-names';

describe('BusLineMapComponent', () => {
  let component: BusLineMapComponent;
  let fixture: ComponentFixture<BusLineMapComponent>;

  const busLine = createSuburbanBusLine();
  const mapId = busLine.directions[0].mapId;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLineMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLineMapComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mapId', mapId);
    fixture.componentRef.setInput('busLinePageName', getBusLinePageName(busLine.number));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the Google My Maps map of the bus line', () => {
    const frame: HTMLIFrameElement = fixture.nativeElement.querySelector('iframe');
    expect(frame.getAttribute('src')).toBe(GOOGLE_MY_MAPS_EMBED_URL + mapId);
    expect(frame.title).toBe(getBusLinePageName(busLine.number));
  });
});
