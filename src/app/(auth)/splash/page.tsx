import React from 'react';
import { Link, router } from 'expo-router';
import { View, Text, Image, Pressable,  } from 'react-native';
import colors from '../../../constants/Colors';
import { estilosGlobais as styles } from '../../../styles/globalStyles';

export default function TelaSplash() {
  return (
    <View style={styles.containerSplash}>
      <Image source={require('../../../../assets/images/MarcaSplash.png')} />
      <View>
        <Text style={styles.tituloSplash}>Organize seu dia com o melhor App</Text>
        <Text style={styles.subtituloSplash}>A ferramenta inteligente para simplificar suas tarefas e listas diárias</Text>
      </View>
     
      <Pressable style={styles.botaoSplash} onPress={() => router.push('/(auth)/login/page')}>
        <Text style={styles.textoBotaoSplash}>Começar Agora</Text>
      </Pressable>
      
    </View>
  );
}

