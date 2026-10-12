import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Modal, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import colors from '../../constants/Colors';
import Header from '../../components/header';

async function SalvarListaCompra(
    nome: string,
    quantidade: string,
    observacoes: string,
    id_user: string
) {
    if (!nome) {
        Alert.alert('Erro', 'Por favor, preencha o nome da lista.');
        return false;
    }

    const novaLista = {
        nome,
        quantidade,
        data_criacao: new Date().toISOString().split('T')[0],
        comprado: false,
        id_user,
        data_compra: null,
        observacoes: observacoes || null,
        prioridade: null,
    };

    const { error } = await supabase.from('listaCompras').insert([novaLista]);
    if (error) {
        Alert.alert('Erro ao salvar lista', error.message);
        return false;
    } else {
        Alert.alert('Sucesso', 'Lista salva com sucesso!');
        return true;
    }
}

export default function Listacompra() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [itens, setItens] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCustomQuantity, setIsCustomQuantity] = useState(false);
    const { user } = useAuth();

    const quantityOptions = [
        '1', '2', '3', '4', '5', '6', '10', '12',
        '1 kg', '2 kg', '500 g', '200 g',
        '1 L', '2 L',
        '1 pacote', '1 caixa', '1 lata', '1 garrafa',
        'Outro (Digitar)'
    ];

    async function carregarListasCompra() {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('listaCompras')
            .select('*')
            .eq('id_user', user.id)
            .order('data_criacao', { ascending: true });

        if (error) {
            Alert.alert('Erro ao carregar listas', error.message);
        } else {
            setItens(data || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        carregarListasCompra();
    }, [user]);

    async function handleSalvar() {
        if (!user) return;

        const sucesso = await SalvarListaCompra(nome, quantidade, observacoes, user.id);
        if (!sucesso) return;

        setNome('');
        setQuantidade('');
        setObservacoes('');
        carregarListasCompra();
    }

    async function excluirLista(id: string) {
        Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta lista?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase.from('listaCompras').delete().eq('id', id);
                    if (error) {
                        Alert.alert('Erro ao excluir lista', error.message);
                    } else {
                        carregarListasCompra();
                    }
                },
            },
        ]);
    }

    async function marcarComoComprado(id: string) {
        const dataCompra = new Date().toISOString().split('T')[0];

        const { error } = await supabase
            .from('listaCompras')
            .update({ comprado: true, data_compra: dataCompra })
            .eq('id', id);

        if (error) {
            Alert.alert('Erro ao concluir lista', error.message);
        } else {
            carregarListasCompra();
        }
    }

    return (
        <View>
            <Header title="Lista de Compras" />
            <Text>Conteúdo da lista de compras</Text>

        </View>
    )}