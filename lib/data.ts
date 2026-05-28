// Sample data — mirrors the original design prototype values
// Replace with real Supabase queries once wired up

export const SAMPLE_TXNS = [
  { id: 't1',  date: '2026-05-28', day: 'Today',     time: '14:32', merchant: 'Jollibee · BGC',       category: 'food',      amount: -385 },
  { id: 't2',  date: '2026-05-28', day: 'Today',     time: '09:15', merchant: 'Grab · to office',     category: 'transport', amount: -240 },
  { id: 't3',  date: '2026-05-28', day: 'Today',     time: '08:02', merchant: 'CBTL · Latte',         category: 'food',      amount: -195 },
  { id: 't4',  date: '2026-05-27', day: 'Yesterday', time: '19:48', merchant: 'Shopee · Skincare',    category: 'shop',      amount: -1240 },
  { id: 't5',  date: '2026-05-27', day: 'Yesterday', time: '12:11', merchant: 'Mang Inasal',          category: 'food',      amount: -210 },
  { id: 't6',  date: '2026-05-27', day: 'Yesterday', time: '08:30', merchant: 'GCash · MRT load',     category: 'transport', amount: -150 },
  { id: 't7',  date: '2026-05-26', day: 'Mon · May 26', time: '00:01', merchant: 'Acme Corp · Payroll', category: 'salary', amount: 42000 },
  { id: 't8',  date: '2026-05-25', day: 'Sun · May 25', time: '11:20', merchant: 'SM Hypermarket',    category: 'groceries', amount: -2380 },
  { id: 't9',  date: '2026-05-25', day: 'Sun · May 25', time: '03:00', merchant: 'Netflix',           category: 'fun',       amount: -549 },
  { id: 't10', date: '2026-05-24', day: 'Sat · May 24', time: '09:00', merchant: 'Meralco · May bill',category: 'bills',     amount: -3120 },
  { id: 't11', date: '2026-05-24', day: 'Sat · May 24', time: '22:14', merchant: 'Freelance · Logo',  category: 'freelance', amount: 8500 },
  { id: 't12', date: '2026-05-23', day: 'Fri · May 23', time: '17:05', merchant: 'Watsons · Vitamins',category: 'health',    amount: -485 },
];

export const SALARY = {
  amount: 55000,
  payDay: 26,
  nextPayout: '2026-06-26',
  cycleStart: '2026-05-26',
  cycleEnd: '2026-06-25',
  cycleDays: 30,
  daysIn: 3,
};

export const LOANS = [
  { id: 'car',   name: 'Car loan · Honda Civic',   cat: 'transport', monthly: 8500,  totalMonths: 60, paidMonths: 23, startDate: '2024-08-26', endDate: '2029-07-26', dueDay: 5 },
  { id: 'phone', name: 'iPhone 15 · installment',  cat: 'shop',      monthly: 1850,  totalMonths: 24, paidMonths: 11, startDate: '2025-07-15', endDate: '2027-06-15', dueDay: 15 },
];

export const RECURRING = [
  { id: 'rent',    name: 'Rent · Studio Makati',  cat: 'rent',  monthly: 12000, dueDay: 1 },
  { id: 'meralco', name: 'Meralco',               cat: 'bills', monthly: 2800,  dueDay: 10 },
  { id: 'net',     name: 'PLDT Fibr · 200Mbps',   cat: 'bills', monthly: 1799,  dueDay: 8 },
  { id: 'netflix', name: 'Netflix',               cat: 'fun',   monthly: 549,   dueDay: 25 },
];

export const BUDGETS = [
  { cat: 'food',      monthly: 6000, spent: 4180 },
  { cat: 'transport', monthly: 3500, spent: 1240 },
  { cat: 'groceries', monthly: 5000, spent: 2380 },
  { cat: 'fun',       monthly: 2000, spent: 1290 },
  { cat: 'shop',      monthly: 2000, spent: 3120 }, // OVER
];

export const CATEGORY_BREAKDOWN = [
  { cat: 'food',      spent: 6420, budget: 6000, txns: 18 },
  { cat: 'transport', spent: 2840, budget: 3500, txns: 12 },
  { cat: 'groceries', spent: 4180, budget: 5000, txns: 4 },
  { cat: 'bills',     spent: 5620, budget: 6500, txns: 3 },
  { cat: 'shop',      spent: 3120, budget: 2000, txns: 5 },
  { cat: 'fun',       spent: 1290, budget: 1500, txns: 4 },
  { cat: 'health',    spent: 485,  budget: 1000, txns: 1 },
];

export const TREND_6MO = [
  { m: 'Dec', spent: 24800, saved: 4200 },
  { m: 'Jan', spent: 26300, saved: 3800 },
  { m: 'Feb', spent: 22100, saved: 6900 },
  { m: 'Mar', spent: 28400, saved: 1500 },
  { m: 'Apr', spent: 23900, saved: 5400 },
  { m: 'May', spent: 23955, saved: 8045 },
];

export function committedMonthly() {
  return LOANS.reduce((s, l) => s + l.monthly, 0) + RECURRING.reduce((s, r) => s + r.monthly, 0);
}
export function budgetTotal() { return BUDGETS.reduce((s, b) => s + b.monthly, 0); }
export function budgetSpent() { return BUDGETS.reduce((s, b) => s + b.spent, 0); }
export function daysLeftInCycle() { return SALARY.cycleDays - SALARY.daysIn; }
export function dailyAllowance() {
  const remaining = SALARY.amount - committedMonthly() - budgetSpent();
  return Math.floor(remaining / Math.max(1, daysLeftInCycle()));
}
export function availableThisCycle() {
  return SALARY.amount - committedMonthly() - budgetSpent();
}
