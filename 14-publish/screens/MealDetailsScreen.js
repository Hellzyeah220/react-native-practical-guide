import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import IconButton from '../components/IconButton';

// import { FavoritesContext } from '../store/context/favorites-context';
import { favoritesActions } from '../store/redux/favorites';

import { MEALS } from '../data/dummy-data';

const MealDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { mealId } = route.params;

  const favoriteMealIds = useSelector(state => state.favorites.ids);

  // const favoriteMealsCtx = useContext(FavoritesContext);

  // const isFavorite = favoriteMealsCtx.ids.includes(mealId);
  const isFavorite = favoriteMealIds.includes(mealId);

  const toggleFavoriteStatusHandler = () => {
    if (isFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(favoritesActions.removeFavorites({ id: mealId }));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(favoritesActions.addFavories({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={isFavorite ? 'star' : 'star-outline'}
            color='#fff'
            onPress={toggleFavoriteStatusHandler}
          />
        );
      }
    });
  }, [navigation, toggleFavoriteStatusHandler]);

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
