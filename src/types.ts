export interface PlanFact {
  income: number;
  activePartners: number;
}

export interface MonthData {
  plan: PlanFact;
  fact: PlanFact;
}

export interface Manager {
  adminName: string;
  months: (MonthData | null)[];
}

export interface ApiData {
  total: MonthData[];
  table: Manager[];
}

export interface ApiResponse {
  success: boolean;
  data: ApiData;
} 