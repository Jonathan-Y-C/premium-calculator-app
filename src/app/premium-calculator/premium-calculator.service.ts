import { Injectable } from '@angular/core';
import { RATING_FACTORS, Occupation, OCCUPATIONS } from './premium-calculator.config';

@Injectable({ providedIn: 'root' })
export class PremiumCalculatorService {
  calculatePremium(age: number, occupation: Occupation, sumInsured: number): number | null {
    if (!occupation || age < 1 || sumInsured < 1) {
      return null;
    }
    // Check if occupation name exists in OCCUPATIONS
    const validOccupation = OCCUPATIONS.find(o => o.name === occupation.name && o.rating === occupation.rating);
    if (!validOccupation) {
      return null;
    }
    const factor = RATING_FACTORS[occupation.rating];
    if (!factor) {
      return null;
    }
    try {
      return (sumInsured * factor * age) / 1000 * 12;
    } catch {
      return null;
    }
  }
}
