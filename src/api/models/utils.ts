import type { MeasureUnit } from './enum_utils';

export interface Quantity {
  amount: number;
  measure_unit: MeasureUnit;
}
