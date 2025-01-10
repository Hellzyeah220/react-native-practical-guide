import axios from 'axios';

const BACKEND_URL =
  'https://react-native-course-http-9b171-default-rtdb.asia-southeast1.firebasedatabase.app';

export const storeExpense = async expenseData => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData,
    { timeout: 1000 }
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`, {
    timeout: 1000
  });

  const expenses = [];
  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData, {
    timeout: 1000
  });
};

export const deleteExpense = id => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`, { timeout: 1000 });
};