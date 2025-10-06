export interface DietTypeCreate {
  diet_name: string;
}

export interface DietTypeResponse extends DietTypeCreate {
  id: number;
}
