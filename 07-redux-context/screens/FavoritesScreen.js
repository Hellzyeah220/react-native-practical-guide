import { useContext } from 'react';

import MealsList from '../components/MealsList/MealsList';

import { FavoritesContext } from '../store/context/favorites-context';

import { MEALS } from '../data/dummy-data';
import { StyleSheet, Text, View } from 'react-native';

const FavoritesScreen = () => {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter(meal =>
    favoriteMealsCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>No favorite meals yet...</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  }
});

export default FavoritesScreen;
