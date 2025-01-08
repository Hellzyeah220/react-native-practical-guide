import { useLayoutEffect } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';

import { MEALS } from '../data/dummy-data';
import IconButton from '../components/IconButton';

const MealDetailsScreen = ({ route, navigation }) => {
  const { mealId } = route.params;

  const headerButtonPressHandler = () => {
    console.log('PRESSED');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon='star'
            color='#fff'
            onPress={headerButtonPressHandler}
          />
        );
      }
    });
  }, [navigation, headerButtonPressHandler]);

  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: '100%',
    height: 350
  },
  title: {
    textAlign: 'center',
    margin: 8,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff'
  },
  detailText: {
    color: '#fff'
  },
  listOuterContainer: {
    alignItems: 'center'
  },
  listContainer: {
    width: '80%'
  }
});

export default MealDetailsScreen;
