export interface Occupation {
  name: string;
  rating: 'Professional' | 'White Collar' | 'Light Manual' | 'Heavy Manual';
}

// Support environment-specific overrides
interface GlobalEnv {
  OCCUPATIONS?: Occupation[];
  RATING_FACTORS?: Record<string, number>;
}
const globalEnv: GlobalEnv = typeof window !== 'undefined' && (window as unknown as { [key: string]: unknown })['env'] ? (window as unknown as { [key: string]: unknown })['env'] as GlobalEnv : {};

export const OCCUPATIONS: Occupation[] = globalEnv.OCCUPATIONS || [
  { name: 'Cleaner', rating: 'Light Manual' },
  { name: 'Doctor', rating: 'Professional' },
  { name: 'Author', rating: 'White Collar' },
  { name: 'Farmer', rating: 'Heavy Manual' },
  { name: 'Mechanic', rating: 'Heavy Manual' },
  { name: 'Florist', rating: 'Light Manual' },
  { name: 'Other', rating: 'Heavy Manual' }
];

export const RATING_FACTORS: Record<string, number> = globalEnv.RATING_FACTORS || {
  'Professional': 1.5,
  'White Collar': 2.25,
  'Light Manual': 11.5,
  'Heavy Manual': 31.75
};
