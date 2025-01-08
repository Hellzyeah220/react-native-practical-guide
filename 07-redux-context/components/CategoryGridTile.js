import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const CategoryGridTile = ({ title, color, onPress }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  button: {
    flex: 1
  },
  buttonPressed: {
    opacity: 0.25
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default CategoryGridTile;
