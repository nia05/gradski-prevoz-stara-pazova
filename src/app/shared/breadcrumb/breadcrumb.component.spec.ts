import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { HOME_BREADCRUMB_LINK } from './breadcrumb.constants';
import { HOME_PATH } from '../../app.routes.constants';
import { getBusLineLink } from '../../app.routes.links';
import { getBusLinePageName } from '../../app.routes.page-names';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  const busLineLink = { name: getBusLinePageName(1), link: getBusLineLink(1) };

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
