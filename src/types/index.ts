// Income entry interface
export interface IncomeEntry {
  Name: string;
  Amount: number;
}

// Bill entry interface
export interface BillEntry {
  Name: string;
  Budget: number;
  Amount: number;
}

// Expense entry interface
export interface ExpenseEntry {
  Name: string;
  Budget: number;
  Amount: number;
}

// Debt entry interface
export interface DebtEntry {
  Name: string;
  Budget: number;
  Amount: number;
}

// Savings entry interface
export interface SavingsEntry {
  Name: string;
  Budget: number;
  Amount: number;
}

// Generic table interface
export interface TableData {
  name: string;
  columns: string[];
  data: (IncomeEntry | BillEntry | ExpenseEntry | DebtEntry | SavingsEntry)[];
}

// Header card interface
export interface HeaderCard {
  name: string;
  sold: number;
}

// Chart card interface
export interface ChartCard {
  name: string;
  data: number[];
}
