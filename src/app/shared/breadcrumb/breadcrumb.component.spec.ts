import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { HOME_BREADCRUMB_LINK } from './breadcrumb.constants';
import { BUS_LINE_PATH, HOME_PATH } from '../../app.routes.constants';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  const busLineLink = { name: 'Linija 1', link: ['/', BUS_LINE_PATH, 1] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', [HOME_BREADCRUMB_LINK, busLineLink]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to every page except the last one, which is the current page', () => {
    const breadcrumb: HTMLElement = fixture.nativeElement;
    const links = breadcrumb.querySelectorAll('.breadcrumb__link');
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe(`/${HOME_PATH}`);
    expect(breadcrumb.querySelector('.breadcrumb__current')?.textContent).toBe(busLineLink.name);
  });
});
