
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../constants/Colors';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    padding: 10,
    color: colors.black,
    fontSize: 18,
  },
});

export default Input;