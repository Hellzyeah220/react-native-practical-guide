import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import { ExpensesContext } from '../store/expenses-context';

import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        console.log(expenses);
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses.');
      }

      setIsFetching(false);
      // setFetchedExpenses(expenses);
    };

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const recentDate = getDateMinusDays(today, 7);
    return expense.date > recentDate;
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period='Last 7 Days'
      fallbackText='No Expenses Data last 7 days...'
    />
  );
};

export default RecentExpenses;
