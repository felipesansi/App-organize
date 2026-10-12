
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { estilosGlobais as styles } from '../styles/globalStyles';

type InputProps = Omit<TextInputProps, 'style'> & {
  icon?: React.ReactNode;
};

const Input = ({ icon, ...textInputProps }: InputProps) => {
  return (
    <View style={localStyles.inputContainer}>
      {icon ? <View style={localStyles.iconWrapper}>{icon}</View> : null}
      <TextInput
        {...textInputProps}
        style={[styles.input, icon ? localStyles.inputWithIcon : null]}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 42,
  },
});

export default Input;