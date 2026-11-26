import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { HOME_PATH } from '../../app.routes.constants';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentPageLabel', 'Linija 1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the home page and shows the current page', () => {
    const breadcrumb: HTMLElement = fixture.nativeElement;
    expect(breadcrumb.querySelector('.breadcrumb__link')?.getAttribute('href')).toBe(`/${HOME_PATH}`);
    expect(breadcrumb.querySelector('.breadcrumb__current')?.textContent).toBe('Linija 1');
  });
});
