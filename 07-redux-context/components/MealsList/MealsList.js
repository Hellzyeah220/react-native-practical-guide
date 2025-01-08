import { FlatList, StyleSheet, View } from "react-native";

import MealItem from "./MealItem";

const MealsList = ({items}) => {
  const renderMealItem = itemData => {
    const { item } = itemData;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability
    };
    return <MealItem {...mealItemProps} />;
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={meal => meal.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default MealsList;
