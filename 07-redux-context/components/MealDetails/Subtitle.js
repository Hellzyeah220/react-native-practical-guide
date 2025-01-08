import { StyleSheet, Text, View } from 'react-native';

const Subtitle = ({ children }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#e2b497'
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#e2b497'
  }
});

export default Subtitle;
