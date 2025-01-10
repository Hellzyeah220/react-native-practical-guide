import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, invalid, textInputConfig }) => {
  let inputStyles = [styles.input];
  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4
  },
  label: {
    marginBottom: 4,
    fontSize: 12,
    color: GlobalStyles.colors.primary100
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 100
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});

export default Input;
