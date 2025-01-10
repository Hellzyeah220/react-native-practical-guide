import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      period='Total'
      fallbackText='No Expenses Data...'
    />
  );
};

export default AllExpenses;
