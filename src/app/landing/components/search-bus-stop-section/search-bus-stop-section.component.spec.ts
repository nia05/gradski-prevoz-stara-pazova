import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBusStopSectionComponent } from './search-bus-stop-section.component';

describe('SearchBusStopSectionComponent', () => {
  let component: SearchBusStopSectionComponent;
  let fixture: ComponentFixture<SearchBusStopSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBusStopSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBusStopSectionComponent);
    component = fixture.componentInstance;
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
});
