export interface Sale {
  id: number;
  date: string;
  category: string;
  region: string;
  amount: number;
}

export interface Filters {
  startDate: string;
  endDate: string;
  category: string;
  region: string;
}