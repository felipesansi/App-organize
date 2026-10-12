import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import Input from '../../../components/input';
import { supabase } from '../../lib/supabase';
import { estilosGlobais as styles } from '../../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/Colors';

export default function Cadastrar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function CadastrosUsers() {
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      Alert.alert('Erro ao cadastrar', 'Preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro ao cadastrar', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro ao cadastrar', error.message || 'Verifique suas credenciais e tente novamente.');
      return;
    }

    if (data.user) {
      Alert.alert('Cadastro realizado com sucesso!', 'Aproveite nosso app!');
      router.replace('/(auth)/login/page');
    }
  }

  return (
    <View style={styles.containerComPadding}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.Texto} />
        </Pressable>
        <Text style={styles.titulo}>Criar Conta</Text>
      </View>

      <Text style={[styles.textoBold, { marginTop: 24 }]}>Comece agora.</Text>
      <Text style={[styles.subtitulo, { marginTop: 8 }]}>Crie sua conta gratuita em poucos segundos.</Text>

      <View style={{ marginTop: 32 }}>
        <Text style={styles.rotuloNegrito}>Nome</Text>
        <Input
          placeholder="Digite seu nome completo"
          value={name}
          onChangeText={setName}
          icon={<Ionicons name="person-outline" size={20} color="black" />}
        />

        <Text style={styles.rotuloNegrito}>E-mail</Text>
        <Input
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          icon={<Ionicons name="mail-outline" size={20} color="black" />}
        />

        <Text style={styles.rotuloNegrito}>Senha</Text>
        <Input
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={<Ionicons name="lock-closed" size={20} color="black" />}
        />
      </View>

      <Pressable
        style={[styles.botao, { marginTop: 24 }]}
        onPress={CadastrosUsers}
        disabled={loading}
      >
        <Text style={styles.textoBotao}>{loading ? 'Cadastrando...' : 'Criar conta'}</Text>
      </Pressable>

      <Pressable
        style={{ marginTop: 16, paddingBottom: 24 }}
        onPress={() => router.push('/(auth)/login/page')}
      >
        <Text style={[styles.texto, { textAlign: 'center', color: colors.TextosSecundarios }]}>
          Já tem uma conta?{' '}
          <Text style={[styles.textoBold, { color: colors.Marca }]}>Entrar</Text>
        </Text>
      </Pressable>
    </View>
  );
}