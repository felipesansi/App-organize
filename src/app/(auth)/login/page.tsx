import colors from '../../../constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useAuth();
  const [tarefas, setTarefas] = useState<Array<any>>([]);

  async function carregarTarefas() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .eq('user_id', user.id)
      .order('data_inicio', { ascending: true });

    if (error) {
      Alert.alert('Erro ao carregar tarefas', error.message);
    } else {
      setTarefas(data || []);
    }
    setLoading(false);
  }

  async function Entrar() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro ao entrar', "Verifique suas credenciais");
      return;
    }

    if (data.user) {
      setUser(data.user);
      router.replace('/(painel)/tarefas' as any);
      carregarTarefas();
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>App<Text style={{ color: colors.white }}> organize</Text></Text>
        <Text style={styles.slogan}>Organize seu dia com o melhor App </Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>E-mail:</Text>
        <TextInput placeholder='Digite seu e-mail' placeholderTextColor={colors.grayStrong}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        ></TextInput>


        <Text style={styles.label}>Senha:</Text>
        <TextInput placeholder='Digite sua senha' placeholderTextColor={colors.grayStrong}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextInput>

        <Pressable style={styles.button} onPress={Entrar}>
          <Text style={styles.text}>  {loading ? 'Carregando...' : 'Entrar'}</Text>
        </Pressable>


        <Link href={'/(auth)/cadastro/page'}>
          <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
        </Link>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: colors.blue
  },


  header: {
    paddingRight: 14,
    paddingLeft: 14,
    marginBottom: 40
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
    marginBottom: 3
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 30,
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 14,
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
  }

});