import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
    padding: 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 36,
    color: Colors.accent500
  }
});

export default NumberContainer;
