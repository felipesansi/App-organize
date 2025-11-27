import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Modal, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { estilosGlobais as styles } from '../../styles/globalStyles';
import colors from '../../constants/Colors';

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
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>🛒 Lista de Compras</Text>
                    <Text style={styles.subtitulo}>Organize suas compras de forma prática</Text>
                </View>

                <View style={styles.cartaoFormulario}>
                    <Text style={styles.tituloFormulario}>✨ Nova Lista</Text>

                    <View style={styles.grupoInput}>
                        <Text style={styles.rotulo}>Nome do Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Arroz, Feijão, etc..."
                            placeholderTextColor={colors.grayStrong}
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.grupoInput}>
                        <Text style={styles.rotulo}>Quantidade</Text>
                        {isCustomQuantity ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="Ex: 2kg, 5 unidades..."
                                    placeholderTextColor={colors.grayStrong}
                                    value={quantidade}
                                    onChangeText={setQuantidade}
                                    autoFocus
                                />
                                <TouchableOpacity
                                    onPress={() => setIsCustomQuantity(false)}
                                    style={{ marginLeft: 10, padding: 10 }}
                                >
                                    <Ionicons name="list" size={24} color={colors.blue} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={{ color: quantidade ? colors.blue : colors.grayStrong, fontSize: 16 }}>
                                    {quantidade || "Selecione a quantidade"}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color={colors.grayStrong} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.grupoInput}>
                        <Text style={styles.rotulo}>Observações</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Observações sobre o item..."
                            placeholderTextColor={colors.grayStrong}
                            value={observacoes}
                            onChangeText={setObservacoes}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.botaoAdicionar}
                        onPress={handleSalvar}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.textoBotaoAdicionar}> Adicionar à Lista</Text>
                    </TouchableOpacity>
                </View>

                {/* Loading */}
                {loading && (
                    <View style={styles.containerCarregamento}>
                        <ActivityIndicator size="large" color={colors.blue} />
                        <Text style={styles.textoCarregamento}>Carregando...</Text>
                    </View>
                )}

                {/* Lista de Itens */}
                {!loading && (
                    <>
                        {/* Itens Pendentes */}
                        <View style={styles.secao}>
                            <Text style={styles.tituloSecao}>📋 Itens Pendentes</Text>
                            {itens.filter(item => !item.comprado).length === 0 ? (
                                <View style={styles.estadoVazio}>
                                    <Text style={styles.textoVazio}>Nenhum item pendente</Text>
                                    <Text style={styles.subtextoVazio}>Adicione itens acima para começar!</Text>
                                </View>
                            ) : (
                                itens.filter(item => !item.comprado).map((item) => (
                                    <View key={item.id} style={styles.cartaoItem}>
                                        <View style={styles.cabecalhoItem}>
                                            <View style={styles.infoItem}>
                                                <Text style={styles.nomeItem}>{item.nome}</Text>
                                                {item.observacoes && (
                                                    <Text style={styles.observacoesItem}>Obs: {item.observacoes}</Text>
                                                )}
                                                <Text style={styles.quantidadeItem}>Qtd: {item.quantidade}</Text>
                                                <Text style={styles.dataItem}>
                                                    Adicionado: {item.data_criacao ? new Date(item.data_criacao).toLocaleDateString('pt-BR') : 'N/A'}
                                                </Text>
                                            </View>
                                            <View style={styles.emblemaItem}>
                                                <Text style={styles.textoEmblema}>Pendente</Text>
                                            </View>
                                        </View>

                                        <View style={styles.acoesItem}>
                                            <TouchableOpacity
                                                style={[styles.botaoAcao, styles.botaoConcluido]}
                                                onPress={() => marcarComoComprado(item.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.textoBotaoConcluido}>✓ Comprado</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.botaoAcao, styles.botaoExcluir]}
                                                onPress={() => excluirLista(item.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.textoBotaoExcluir}>🗑️ Excluir</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>

                        {/* Itens Comprados */}
                        {itens.filter(item => item.comprado).length > 0 && (
                            <View style={styles.secao}>
                                <Text style={styles.tituloSecao}>✅ Itens Comprados</Text>
                                {itens.filter(item => item.comprado).map((item) => (
                                    <View key={item.id} style={[styles.cartaoItem, styles.cartaoConcluido]}>
                                        <View style={styles.cabecalhoItem}>
                                            <View style={styles.infoItem}>
                                                <Text style={[styles.nomeItem, styles.textoConcluido]}>{item.nome}</Text>
                                                <Text style={[styles.quantidadeItem, styles.textoConcluido]}>
                                                    Qtd: {item.quantidade}
                                                </Text>
                                                <Text style={styles.dataItem}>
                                                    Comprado: {item.data_compra ? new Date(item.data_compra).toLocaleDateString('pt-BR') : 'N/A'}
                                                </Text>
                                            </View>
                                            <View style={styles.emblemaConcluido}>
                                                <Text style={styles.textoEmblemaConcluido}>✓ Comprado</Text>
                                            </View>
                                        </View>

                                        <View style={styles.acoesItem}>
                                            <TouchableOpacity
                                                style={[styles.botaoAcao, styles.botaoExcluir]}
                                                onPress={() => excluirLista(item.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.textoBotaoExcluir}>🗑️ Excluir</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ backgroundColor: colors.white, borderRadius: 12, width: '80%', maxHeight: '60%', padding: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>Selecione a Quantidade</Text>
                        <FlatList
                            data={quantityOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.gray }}
                                    onPress={() => {
                                        if (item === 'Outro (Digitar)') {
                                            setIsCustomQuantity(true);
                                            setQuantidade('');
                                        } else {
                                            setQuantidade(item);
                                            setIsCustomQuantity(false);
                                        }
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ fontSize: 16, color: colors.black, textAlign: 'center' }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
