import type { MeasureUnit } from "./enum_utils";

/** Refrigerator models */

export interface CreateRefrigerator {
    name: string;
    amount: number;
    measure_unit: MeasureUnit;
}

export interface PostCreateRefrigerator extends CreateRefrigerator {
    id: number;
}

export interface Refrigerator {
    user_id: number;
    ingredient_id: number;
    amount: number;
    measure_unit: MeasureUnit;
}

export interface RefrigeratorGet {
    users: string;
    ingredients: string;
    amount: number;
    measure_unit: MeasureUnit;
}
