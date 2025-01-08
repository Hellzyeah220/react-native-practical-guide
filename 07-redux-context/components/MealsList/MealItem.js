import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MealDetails from '../MealDetails';

const MealItem = ({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability
}) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('MealDetails', { mealId: id });
  };
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => pressed && styles.buttonPressed}
        onPress={pressHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image
              source={{
                uri: imageUrl
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            affordability={affordability}
            complexity={complexity}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    // overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  buttonPressed: {
    opacity: 0.25
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    textAlign: 'center',
    margin: 8,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default MealItem;
