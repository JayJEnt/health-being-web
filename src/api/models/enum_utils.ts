export const ActivityLevel = {
	sedentary: "sedentary",
	light: "light",
	moderate: "moderate",
	very: "very",
} as const;

export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];

export const Silhouette = {
	ectomorph: "ectomorph",
	mesomorph: "mesomorph",
	endomorph: "endomorph",
} as const;

export type Silhouette = (typeof Silhouette)[keyof typeof Silhouette];

export const Role = {
	unconfirmed: "unconfirmed",
	user: "user",
	admin: "admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const MeasureUnit = {
	kilogram: "kg.",
	gram: "g.",
	liter: "l.",
	milliliter: "ml.",
	unit: "",
} as const;

export type MeasureUnit = (typeof MeasureUnit)[keyof typeof MeasureUnit];

export const Preference = {
	like: "like",
	dislike: "dislike",
	alergic: "alergic to",
} as const;

export type Preference = (typeof Preference)[keyof typeof Preference];

export const Category = {
	salad: "Salad",
	soup: "Soup",
	main_dish: "Main Dish",
	appetizer: "Appetizer",
	dessert: "Dessert",
	snack: "Snack",
	beverage: "Beverage",
	breakfast: "Breakfast",
	brunch: "Brunch",
	side_dish: "Side Dish",
	pasta: "Pasta",
	grilled: "Grilled",
	smoothie: "Smoothie",
	bbq: "BBQ",
	slow_cooker: "Slow Cooker",
	stir_fry: "Stir Fry",
	fermented: "Fermented",
} as const;

export type Category = (typeof Category)[keyof typeof Category];
