import { Component, input } from '@angular/core';

@Component({
  selector: 'app-line',
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  /** From the URL: /linija/:broj */
  broj = input.required<string>();
}
