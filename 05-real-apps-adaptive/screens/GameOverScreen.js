import { Image, StyleSheet, Text, View } from 'react-native';

import Title from '../components/UI/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/UI/PrimaryButton';

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER !</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds
        to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>START NEW GAME</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    margin: 36,
    borderWidth: 3,
    borderColor: Colors.primary800,
    borderRadius: '50%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'open-sans',
    fontSize: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
});

export default GameOverScreen;
