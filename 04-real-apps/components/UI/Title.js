import { StyleSheet, Text } from 'react-native';

import Colors from '../../constants/colors';

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff'
  }
});

export default Title;
