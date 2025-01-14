import { StyleSheet, Text, View } from 'react-native';

const List = ({ data }) => {
  return data.map(dataPoint => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 4,
    marginHorizontal: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#e2b497'
  },
  itemText: {
    textAlign: 'center',
    color: '#351401'
  }
});

export default List;
