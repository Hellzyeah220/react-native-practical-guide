import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-27')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2024-08-27')
  },
  {
    id: 'e3',
    description: 'Some Bananas',
    amount: 5.59,
    date: new Date('2025-01-01')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.89,
    date: new Date('2024-06-01')
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 13.89,
    date: new Date('2025-01-07')
  },
  {
    id: 'e6',
    description: 'Mouse',
    amount: 15.89,
    date: new Date('2024-12-30')
  },
  {
    id: 'e7',
    description: 'Another book',
    amount: 13.89,
    date: new Date('2025-01-07')
  },
  {
    id: 'e8',
    description: 'Mouse',
    amount: 15.89,
    date: new Date('2024-12-30')
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 13.89,
    date: new Date('2025-01-07')
  },
  {
    id: 'e10',
    description: 'Mouse',
    amount: 15.89,
    date: new Date('2024-12-30')
  }
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {}
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
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
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
