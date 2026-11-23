import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HOME_PATH } from '../../app.routes.constants';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected readonly homePath = HOME_PATH;
}
