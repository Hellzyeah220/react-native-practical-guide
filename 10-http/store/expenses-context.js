import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: ([]) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {}
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      const expenses = action.payload.reverse();
      return expenses;
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
    case 'UPDATE':
      const updatedExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      );
      const updatedExpense = {
        ...state[updatedExpenseIndex],
        ...action.payload.data
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatedExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = expenses => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const addExpense = expenseData => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = id => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const value = {
    expenses,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
