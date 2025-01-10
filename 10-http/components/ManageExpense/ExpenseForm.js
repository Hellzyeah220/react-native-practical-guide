import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';

import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  submitButtonLabel,
  defaultValues,
  onCancel,
  onSubmit
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? '',
      valid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      valid: true
    },
    description: {
      value: defaultValues?.description ?? '',
      valid: true
    }
  });

  const inputChangeHandler = (inputId, enteredValue) => {
    setInputs(prevState => ({
      ...prevState,
      [inputId]: { value: enteredValue, valid: true }
    }));
  };

  const submitHandler = () => {
    const amountIsValid =
      !isNaN(inputs.amount.value) && inputs.amount.value > 0;

    const dateParts = inputs.date.value.split('/');
    const parsedDate = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0]
    );
    const dateIsValid = parsedDate.toString() !== 'Invalid Date';

    const descriptionIsValid = inputs.description.value?.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      // Alert.alert('Invalid input', 'Please check your input values.');
      setInputs(prevState => ({
        amount: { value: prevState.amount.value, valid: amountIsValid },
        date: { value: prevState.date.value, valid: dateIsValid },
        description: {
          value: prevState.description.value,
          valid: descriptionIsValid
        }
      }));
      return;
    }

    const expenseData = {
      amount: +inputs.amount.value,
      date: parsedDate,
      description: inputs.description.value
    };

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.valid || !inputs.date.valid || !inputs.description.valid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          invalid={!inputs.amount.valid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          invalid={!inputs.date.valid}
          textInputConfig={{
            placholder: 'dd-MM-YYYY',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.valid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
          // autoCorrect: false // default is true
          // autoCapitalize: 'none'
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input -- Please check your data.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          CANCEL
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffff'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    margin: 8,
    color: GlobalStyles.colors.error500
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});

export default ExpenseForm;
