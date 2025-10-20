import type { Quantity } from './utils';

export interface RefrigeratorCreate extends Quantity {
  name: string;
}

export interface RefrigeratorCreateResponse extends RefrigeratorCreate {
  id: number;
}

export interface RefrigeratorResponse extends RefrigeratorCreate {
  ingredient_id: number;
}

export interface RefrigeratorDelete extends Quantity {
  user_id: number;
  ingredient_id: number;
}
