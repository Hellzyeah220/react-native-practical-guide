import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { ExpensesContext } from '../store/expenses-context';

import { deleteExpense, storeExpense, updateExpense } from '../util/http';

import { GlobalStyles } from '../constants/styles';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const { expenseId } = route.params ?? {};

  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === expenseId
  );

  const errorHandler = () => {
    setError(null);
  };

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);

      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense. Try again later.');
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async expenseData => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }

      navigation.goBack();
    } catch (error) {
      setError('Could not save data. Try again later.');
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [isEditing, navigation]);

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'UPDATE' : 'ADD'}
        defaultValues={selectedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },

  deleteContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200
  }
});

export default ManageExpense;
