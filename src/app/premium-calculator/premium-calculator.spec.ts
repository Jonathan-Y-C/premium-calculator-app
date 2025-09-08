import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculator } from './premium-calculator';

describe('PremiumCalculator', () => {
  let component: PremiumCalculator;
  let fixture: ComponentFixture<PremiumCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all required occupations', () => {
    const names = component.occupations.map(o => o.name);
    expect(names).toContain('Cleaner');
    expect(names).toContain('Doctor');
    expect(names).toContain('Author');
    expect(names).toContain('Farmer');
    expect(names).toContain('Mechanic');
    expect(names).toContain('Florist');
    expect(names).toContain('Other');
  });

  it('should return correct rating factors', () => {
    expect(component.ratingFactors['Professional']).toBe(1.5);
    expect(component.ratingFactors['White Collar']).toBe(2.25);
    expect(component.ratingFactors['Light Manual']).toBe(11.5);
    expect(component.ratingFactors['Heavy Manual']).toBe(31.75);
  });

  it('should not calculate premium if form is incomplete', () => {
    component.name = 'John';
    component.age = 30;
    component.dob = '01/1995';
    component.occupation = null;
    component.sumInsured = 100000;
    component.calculatePremium();
    expect(component.premium).toBeNull();
  });

  it('should calculate premium correctly for Professional', () => {
    component.name = 'John';
    component.age = 30;
    component.dob = '01/1995';
    component.occupation = { name: 'Doctor', rating: 'Professional' };
    component.sumInsured = 100000;
    component.calculatePremium();
    // (100000 * 1.5 * 30) / 1000 * 12 = 54000
    expect(component.premium).toBeCloseTo(54000);
  });

  it('should calculate premium correctly for Heavy Manual', () => {
    component.name = 'Jane';
    component.age = 40;
    component.dob = '02/1985';
    component.occupation = { name: 'Farmer', rating: 'Heavy Manual' };
    component.sumInsured = 50000;
    component.calculatePremium();
    // (50000 * 31.75 * 40) / 1000 * 12 = 762000
    expect(component.premium).toBeCloseTo(762000);
  });

  it('should validate form correctly', () => {
    component.name = 'Test';
    component.age = 25;
    component.dob = '12/2000';
    component.occupation = { name: 'Florist', rating: 'Light Manual' };
    component.sumInsured = 20000;
    expect(component.isFormValid()).toBeTrue();
    component.name = '';
    expect(component.isFormValid()).toBeFalse();
  });
});
