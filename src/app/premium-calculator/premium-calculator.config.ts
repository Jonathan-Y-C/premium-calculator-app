export interface Occupation {
  name: string;
  rating: 'Professional' | 'White Collar' | 'Light Manual' | 'Heavy Manual';
}

export const OCCUPATIONS: Occupation[] = [
  { name: 'Cleaner', rating: 'Light Manual' },
  { name: 'Doctor', rating: 'Professional' },
  { name: 'Author', rating: 'White Collar' },
  { name: 'Farmer', rating: 'Heavy Manual' },
  { name: 'Mechanic', rating: 'Heavy Manual' },
  { name: 'Florist', rating: 'Light Manual' },
  { name: 'Other', rating: 'Heavy Manual' }
];

export const RATING_FACTORS: Record<string, number> = {
  'Professional': 1.5,
  'White Collar': 2.25,
  'Light Manual': 11.5,
  'Heavy Manual': 31.75
};

