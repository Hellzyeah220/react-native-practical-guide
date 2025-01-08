import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

import MealsList from '../components/MealsList/MealsList';

import { CATEGORIES, MEALS } from '../data/dummy-data';

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      category => category.id === categoryId
    ).title;
    navigation.setOptions({ title: categoryTitle });
  }, [categoryId, navigation]);

  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );
  return <MealsList items={displayedMeals} />;
};

const styles = StyleSheet.create({});

export default MealsOverviewScreen;
