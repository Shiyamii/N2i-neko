import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeachComponent } from './beach/beach.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BeachComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'clean-the-ocean';
}
