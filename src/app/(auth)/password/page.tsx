import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import Input from '../../../components/input';
import { estilosGlobais as styles } from '../../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/Colors';


export default function RecuperarSenha() {
    const [email, setEmail] = useState(''); 

    const [loading, setLoading] = useState(false);

    async function recuperarSenha() {
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        setLoading(false);

        if (error) {
            Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação.');
        } else {
            Alert.alert('Sucesso', 'E-mail de recuperação enviado com sucesso.');
            router.back();
        }
    }

    return (
        <View style={styles.containerComPadding}>
            <Text style={styles.logo}>App<Text style={styles.texto}> organize</Text></Text>
            <View style={{ marginTop: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{ padding: 4, marginRight: 12 }}
                        accessibilityRole="button"
                        accessibilityLabel="Voltar"
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.Texto} />
                    </Pressable>
                    <Text style={styles.textoBold}>Recuperar Senha</Text>
                </View>
                <Text style={{ marginTop: 12, color: '#666' }}>
                    Digite seu e-mail para receber instruções de recuperação de senha.
                </Text>
            </View>

            <View style={{ marginTop: 24 }}>
                <Text style={styles.rotuloNegrito}>E-mail</Text>
                <Input
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon={<Ionicons name="mail-outline" size={20} color="black" />}
                />
            </View>

            <Pressable
                style={[styles.botao, { marginTop: 24 }]}
                onPress={recuperarSenha}
                disabled={loading}
            >
                <Text style={styles.textoBotao}>{loading ? 'Enviando...' : 'Enviar Instruções'}</Text>
          </Pressable>
         

        </View>
    );
}
