import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { BusStopWarningComponent } from './bus-stop-warning.component';
import { createNews } from '../../../core/news/news.generator';
import { NEWS_PATH } from '../../../app.routes.constants';

describe('BusStopWarningComponent', () => {
  let component: BusStopWarningComponent;
  let fixture: ComponentFixture<BusStopWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStopWarningComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStopWarningComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('routeChangeNewsId', null);
  });

  function showWarningFor(skippedBusStopNames: string[]): string {
    fixture.componentRef.setInput('skippedBusStopNames', skippedBusStopNames);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.bus-stop-warning__text').textContent.trim();
  }

  it('should create', () => {
    showWarningFor(['Jana Bota']);
    expect(component).toBeTruthy();
  });

  it('names the one skipped bus stop', () => {
    expect(showWarningFor(['Jana Bota'])).toBe('Autobus ne staje na stajalištu Jana Bota.');
  });

  it('names all skipped bus stops', () => {
    expect(showWarningFor(['Jana Bota', 'Škola Pinki']))
      .toBe('Autobus ne staje na stajalištima Jana Bota, Škola Pinki.');
  });

  function getNewsLink(): HTMLAnchorElement | null {
    return fixture.nativeElement.querySelector('.bus-stop-warning__link');
  }

  it('links to the news about the route change', () => {
    const news = createNews();
    fixture.componentRef.setInput('routeChangeNewsId', news.id);
    showWarningFor(['Jana Bota']);
    expect(getNewsLink()?.getAttribute('href')).toBe(`/${NEWS_PATH}/${news.id}`);
  });

  it('has no news link when there is no news about the route change', () => {
    showWarningFor(['Jana Bota']);
    expect(getNewsLink()).toBeNull();
  });
});
