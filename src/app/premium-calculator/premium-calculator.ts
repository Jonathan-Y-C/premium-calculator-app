import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OCCUPATIONS, RATING_FACTORS, Occupation } from './premium-calculator.config';
import { debounceTime } from 'rxjs/operators';
import { PremiumCalculatorService } from './premium-calculator.service';

@Component({
  selector: 'app-premium-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './premium-calculator.html',
  styleUrls: ['./premium-calculator.css']
})
export class PremiumCalculator {
  form: FormGroup;
  occupations: Occupation[] = OCCUPATIONS;
  ratingFactors: Record<string, number> = RATING_FACTORS;
  premium: number | null = null;
  premiumError: string | null = null;

  fb = inject(FormBuilder);
  premiumService = inject(PremiumCalculatorService);

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      dob: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)]],
      occupation: [null, Validators.required],
      sumInsured: [null, [Validators.required, Validators.min(1)]]
    });
    this.form.valueChanges.subscribe(() => this.calculatePremium());
    this.form.valueChanges.pipe(debounceTime(200)).subscribe(() => this.calculatePremium());
  }

  calculatePremium() {
    if (this.form.valid) {
      const { age, occupation, sumInsured } = this.form.value;
      this.premium = this.premiumService.calculatePremium(age, occupation, sumInsured);
    } else {
      this.premium = null;
    }
  }
}
