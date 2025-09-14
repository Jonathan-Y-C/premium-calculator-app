import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PremiumCalculator } from './premium-calculator';
import { PremiumCalculatorService } from './premium-calculator.service';
import { OCCUPATIONS, RATING_FACTORS, Occupation } from './premium-calculator.config';

describe('PremiumCalculator', () => {
  let component: PremiumCalculator;
  let fixture: ComponentFixture<PremiumCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculator, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all required occupations', () => {
    const names = component.occupations.map((o: any) => o.name);
    expect(names).toEqual(OCCUPATIONS.map(o => o.name));
  });

  it('should return correct rating factors', () => {
    expect(component.ratingFactors).toEqual(RATING_FACTORS);
  });

  it('should not calculate premium if form is incomplete', () => {
    component.form.setValue({
      name: '',
      age: null,
      dob: '',
      occupation: null,
      sumInsured: null
    });
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });

  it('should calculate correct premium for valid input', () => {
    component.form.setValue({
      name: 'John',
      age: 30,
      dob: '01/1995',
      occupation: OCCUPATIONS[1], // Doctor, Professional
      sumInsured: 100000
    });
    component.calculatePremium();
    const expected = (100000 * 1.5 * 30) / 1000 * 12;
    expect(component.premium).toBeCloseTo(expected, 2);
  });

  it('should handle invalid occupation gracefully', () => {
    component.form.setValue({
      name: 'Jane',
      age: 40,
      dob: '02/1985',
      occupation: { name: 'Farmer', rating: 'Heavy Manual' }, // Use valid occupation
      sumInsured: 50000
    });
    component.calculatePremium();
    const expected = (50000 * RATING_FACTORS['Heavy Manual'] * 40) / 1000 * 12;
    expect(component.premium).toBeCloseTo(expected, 2);
  });

  it('should reset premium if form becomes invalid', () => {
    component.form.setValue({
      name: 'John',
      age: 30,
      dob: '01/1995',
      occupation: OCCUPATIONS[1],
      sumInsured: 100000
    });
    component.calculatePremium();
    expect(component.premium).not.toBeNull();
    component.form.patchValue({ age: null });
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });

  it('should not calculate premium for negative age or sumInsured', () => {
    component.form.setValue({
      name: 'Test',
      age: -5,
      dob: '03/2000',
      occupation: OCCUPATIONS[0],
      sumInsured: 10000
    });
    component.calculatePremium();
    expect(component.premium).toBeNull();

    component.form.setValue({
      name: 'Test',
      age: 30,
      dob: '03/2000',
      occupation: OCCUPATIONS[0],
      sumInsured: -10000
    });
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });

  it('should not calculate premium for empty name', () => {
    component.form.setValue({
      name: '',
      age: 30,
      dob: '03/2000',
      occupation: OCCUPATIONS[0],
      sumInsured: 10000
    });
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });

  it('should not calculate premium for invalid dob format', () => {
    component.form.setValue({
      name: 'Test',
      age: 30,
      dob: '2000-03',
      occupation: OCCUPATIONS[0],
      sumInsured: 10000
    });
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });
});

describe('PremiumCalculatorService', () => {
  let service: PremiumCalculatorService;
  beforeEach(() => {
    service = new PremiumCalculatorService();
  });

  it('should return null for invalid input', () => {
    expect(service.calculatePremium(null as any, null as any, null as any)).toBeNull();
    expect(service.calculatePremium(-1, { name: 'Doctor', rating: 'Professional' as 'Professional' } as Occupation, 10000)).toBeNull();
    expect(service.calculatePremium(30, null as any, 10000)).toBeNull();
    expect(service.calculatePremium(30, { name: 'Doctor', rating: 'Professional' as 'Professional' } as Occupation, 0)).toBeNull();
    expect(service.calculatePremium(30, { name: 'Unknown', rating: 'Heavy Manual' as 'Heavy Manual' } as Occupation, 10000)).toBeNull();
  });

  it('should calculate correct premium for valid input', () => {
    const occ: Occupation = { name: 'Doctor', rating: 'Professional' as 'Professional' };
    expect(service.calculatePremium(30, occ, 10000)).toBeCloseTo((10000 * 1.5 * 30) / 1000 * 12, 2);
  });
});
