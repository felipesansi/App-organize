import colors from '../../../constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>App<Text style={{ color: colors.white }}> organize</Text></Text>
        <Text style={styles.slogan}>Crie sua conta e organize seu dia.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor={colors.grayStrong}
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.grayStrong}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor={colors.grayStrong}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={CadastrosUsers}>
          <Text style={styles.text}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
        </Pressable>

        <Link href="/(auth)/login/page">
          <Text style={styles.link}>Já tem uma conta? Faça login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: colors.blue,
  },
  header: {
    paddingHorizontal: 14,
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    color: colors.green,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  slogan: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 3,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 14,
  },
  label: {
    color: colors.blue,
    marginBottom: 4,
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
  button: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: colors.blue,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});
