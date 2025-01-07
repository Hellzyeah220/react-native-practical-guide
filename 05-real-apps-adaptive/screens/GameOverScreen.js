import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

import Title from '../components/UI/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/UI/PrimaryButton';

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER !</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require('../assets/images/success.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>START NEW GAME</PrimaryButton>
      </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
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
