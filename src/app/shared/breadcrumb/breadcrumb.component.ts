import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HOME_PATH } from '../../app.routes.constants';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  readonly currentPageLabel = input.required<string>();

  protected readonly homePath = HOME_PATH;
}
