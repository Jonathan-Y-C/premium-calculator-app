import { Component, signal } from '@angular/core';
import { PremiumCalculator } from './premium-calculator/premium-calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PremiumCalculator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('premium-calculator-app');
}
