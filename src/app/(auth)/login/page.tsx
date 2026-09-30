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
   
  )
}

