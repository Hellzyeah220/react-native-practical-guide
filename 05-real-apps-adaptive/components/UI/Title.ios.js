import { Platform, StyleSheet, Text } from 'react-native';

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    width: 300,
    maxWidth: '80%',
    padding: 12,
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderWidth: 0,
    borderColor: '#fff',
    // fontWeight: 'bold',
    fontSize: 24,
    color: '#fff'
  }
});

export default Title;
