// src/types/Recipe.ts

export type Vitamin = {
	id: number;
	name: string;
};

export type Ingredient = {
	id: number;
	name: string;
	unit: string;
	amount: number;
	calories_per_100: number;
	protein_per_100: number;
	fat_per_100: number;
	carbs_per_100: number;
	fiber_per_100: number;
	sugar_per_100: number;
	salt_per_100: number;
	vitamins: Vitamin[];
};

export type Recipe = {
	id: number;
	name: string;
	description: string;
	diet_type: string[];
	ingredients: Ingredient[];
};
