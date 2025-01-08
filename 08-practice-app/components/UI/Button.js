import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const Button = ({ mode, style, onPress, children }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary500
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  },
  pressed: {
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary100,
    opacity: 0.75
  }
});

export default Button;
