import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BreadcrumbLink } from './breadcrumb.model';
import { IconPath } from '../icon-path.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  readonly links = input.required<BreadcrumbLink[]>();

  protected readonly iconPath = IconPath;
}
