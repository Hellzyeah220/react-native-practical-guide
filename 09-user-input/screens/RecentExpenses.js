import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

import { ExpensesContext } from '../store/expenses-context';

import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const recentDate = getDateMinusDays(today, 7);
    return expense.date > recentDate;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period='Last 7 Days'
      fallbackText='No Expenses Data last 7 days...'
    />
  );
};

export default RecentExpenses;
