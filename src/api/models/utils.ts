import type { MeasureUnit } from './enum_utils';

export interface Quantity {
  amount: number;
  measure_unit: MeasureUnit;
}

export interface Micronutrients {
  calories_per_100?: number | null;
  protein_per_100?: number | null;
  fat_per_100?: number | null;
  carbon_per_100?: number | null;
  fiber_per_100?: number | null;
  sugar_per_100?: number | null;
  salt_per_100?: number | null;
}

export interface MicronutrientsTotal {
  calories?: number | null;
  protein?: number | null;
  fat?: number | null;
  carbon?: number | null;
  fiber?: number | null;
  sugar?: number | null;
  salt?: number | null;
}
