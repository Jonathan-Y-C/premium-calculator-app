import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Occupation {
  name: string;
  rating: 'Professional' | 'White Collar' | 'Light Manual' | 'Heavy Manual';
}

@Component({
  selector: 'app-premium-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './premium-calculator.html',
  styleUrl: './premium-calculator.css'
})
export class PremiumCalculator {
  name = '';
  age: number | null = null;
  dob = '';
  occupation: Occupation | null = null;
  sumInsured: number | null = null;
  premium: number | null = null;
  formTouched = false;

  occupations: Occupation[] = [
    { name: 'Cleaner', rating: 'Light Manual' },
    { name: 'Doctor', rating: 'Professional' },
    { name: 'Author', rating: 'White Collar' },
    { name: 'Farmer', rating: 'Heavy Manual' },
    { name: 'Mechanic', rating: 'Heavy Manual' },
    { name: 'Florist', rating: 'Light Manual' },
    { name: 'Other', rating: 'Heavy Manual' }
  ];

  ratingFactors: Record<string, number> = {
    'Professional': 1.5,
    'White Collar': 2.25,
    'Light Manual': 11.5,
    'Heavy Manual': 31.75
  };

  onInputChange() {
    this.formTouched = true;
    this.calculatePremium();
  }

  calculatePremium() {
    if (
      this.name &&
      this.age &&
      this.dob &&
      this.occupation &&
      this.sumInsured
    ) {
      const factor = this.ratingFactors[this.occupation.rating];
      this.premium = (this.sumInsured * factor * this.age) / 1000 * 12;
    } else {
      this.premium = null;
    }
  }

  isFormValid() {
    return !!(
      this.name &&
      this.age &&
      this.dob &&
      this.occupation &&
      this.sumInsured
    );
  }
}
