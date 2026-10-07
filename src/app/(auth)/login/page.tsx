import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Input from '../../../components/input';
import { estilosGlobais as styles } from '../../../styles/globalStyles';


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
      router.replace('/(painel)/tarefas');
      carregarTarefas();
      setLoading(false);
    }
  }

  return (
   <View style={styles.containerComPadding}>
    <Text style={styles.logo}>App<Text style={styles.texto}> organize</Text></Text>
    <Text style={[styles.textoBold, { marginTop: 24 }]}>Bem-vindo de volta.</Text>
    <Text style={[styles.subtitulo, { marginTop: 8 }]}>Entre com sua conta para continuar.</Text>
     
    <View style={{ marginTop: 44 }}>
       <Text style={styles.rotuloNegrito}>E-mail</Text>
     <Input
      placeholder="Digite seu e-mail"
      value={email}
      onChangeText={setEmail}
    />
    <Text style={styles.rotuloNegrito}>Senha</Text>
    <Input
      placeholder="Digite sua senha"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    </View>
         <Pressable
      style={[styles.botao, { marginTop: 24 }]}
      onPress={Entrar}
      disabled={loading}
    >
      <Text style={styles.textoBotao}>{loading ? 'Entrando...' : 'Entrar'}</Text>
    </Pressable>
     
     <Pressable
      style={{ marginTop: 12 }}
      onPress={() => router.push('/(auth)/password/page')}
    >
      <Text style={[styles.texto, { textAlign: 'right' }]}>
   <Text style={styles.textoBold}>Esqueci minha senha</Text>
      </Text>
    </Pressable>
    </View>
   
  )
}
