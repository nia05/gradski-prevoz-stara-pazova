import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HOME_LINK } from '../../app.routes.constants';
import { IconPath } from '../icon-path.model';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected readonly homeLink = HOME_LINK;
  protected readonly iconPath = IconPath;
}
