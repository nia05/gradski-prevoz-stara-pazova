import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesSectionComponent } from './bus-lines-section.component';

describe('BusLinesSectionComponent', () => {
  let component: BusLinesSectionComponent;
  let fixture: ComponentFixture<BusLinesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLinesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLinesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
