import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

import PrimaryButton from '../components/UI/PrimaryButton';

import Colors from '../constants/colors';
import Title from '../components/UI/Title';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const numberInputHandler = enteredText => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number !',
        'A valid number has to be a number between 1 - 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText style={styles.instructionText}>
          Enter a Number
        </InstructionText>
        <TextInput
          style={styles.numberInput}
          keyboardType='number-pad'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={2}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>RESET</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>CONFIRM</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },

  numberInput: {
    textAlign: 'center',
    height: 50,
    width: 50,
    marginVertical: 8,
    paddingVertical: 0,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.accent500
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  }
});

export default StartGameScreen;
