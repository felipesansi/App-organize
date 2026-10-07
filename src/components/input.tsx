
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../constants/Colors';
import { estilosGlobais as styles } from '../styles/globalStyles';

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

export default Input;