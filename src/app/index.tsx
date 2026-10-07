import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabase';
import colors from '../constants/Colors';
import { useAuth } from '../contexts/AuthContext';

export default function IndexScreen() {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    const verificaoSessao = async () => {

      await new Promise(resolve => setTimeout(resolve, 2000));

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        router.replace('/(painel)/tarefas' as any);
      } else {
        setUser(null);
        router.replace('/(auth)/splash/page' as any);
      }
    };

    verificaoSessao();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>App<Text style={{ color: colors.Texto }}> organize</Text></Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Fundo,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    color: colors.Marca,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
