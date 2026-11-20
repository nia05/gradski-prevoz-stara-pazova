import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLineItemComponent } from './bus-line-item.component';

describe('BusLineItemComponent', () => {
  let component: BusLineItemComponent;
  let fixture: ComponentFixture<BusLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLineItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
