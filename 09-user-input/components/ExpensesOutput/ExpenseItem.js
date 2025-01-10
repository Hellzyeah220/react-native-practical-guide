import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getFormattedDate } from '../../util/date';

import { GlobalStyles } from '../../constants/styles';

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  amount: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
});

export default ExpenseItem;
