import {
    View, Text, TextInput,
    TouchableOpacity, Modal, Alert,
    FlatList, Linking, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import { estilosGlobais as styles } from '../../styles/globalStyles';

const { height } = Dimensions.get("window");

interface SenhaData {
    id: string;
    nome: string;
    senha: string;
    ativa: boolean;
    origem: string;
    data_criacao: string;
    user_id: string;
}

export async function SalvarSenha(
    nome: string,
    senha: string,
    origem: string,
    user_id: string
) {
    if (!nome || !senha) {
        Alert.alert('Erro', 'Por favor, preencha o nome e a senha.');
        return false;
    }

    const novaSenha = {
        nome,
        senha,
        ativa: true,
        origem,
        data_criacao: new Date().toISOString(),
        user_id: user_id,
    };

    const { error } = await supabase.from('senhas').insert([novaSenha]);
    if (error) {
        Alert.alert('Erro ao salvar senha', error.message);
        return false;
    } else {
        Alert.alert('Sucesso', 'Senha salva com sucesso!');
        return true;
    }
}

export default function Senha() {
    const { setUser, user } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState<string | null>(null);

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [origem, setOrigem] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const [senhas, setSenhas] = useState<SenhaData[]>([]);
    const [loading, setLoading] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState(user?.user_metadata.name || 'Usuário');
    const [emailUsuario, setEmailUsuario] = useState(user?.email || 'email não disponível');
    const [senhasVisiveis, setSenhasVisiveis] = useState<Record<string, boolean>>({});

    async function EncerrarSessao() {
        setMenuVisible(false);
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Erro ao encerrar sessão', error.message);
            return;
        }
        setUser(null);
        router.replace('/(auth)/login/page');
    }

    async function carregarSenhas() {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('senhas')
            .select('*')
            .eq('user_id', user.id)
            .order('data_criacao', { ascending: false });

        if (error) {
            Alert.alert('Erro ao carregar senhas', error.message);
        } else {
            setSenhas(data || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        carregarSenhas();
    }, [user]);

    async function handleSalvar() {
        if (!user) return;

        if (editando && idEditando !== null) {
            const { error } = await supabase
                .from('senhas')
                .update({ nome, senha, origem })
                .eq('id', idEditando);

            if (error) {
                Alert.alert('Erro ao atualizar senha', error.message);
                return;
            }

            Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        } else {
            const sucesso = await SalvarSenha(nome, senha, origem, user.id);
            if (!sucesso) return;
        }

        setFormVisible(false);
        setNome('');
        setSenha('');
        setOrigem('');
        setSenhaVisivel(false);
        setEditando(false);
        setIdEditando(null);
        carregarSenhas();
    }

    async function excluirSenha(id: string) {
        Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta senha?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase.from('senhas').delete().eq('id', id);
                    if (error) {
                        Alert.alert('Erro ao excluir senha', error.message);
                    } else {
                        carregarSenhas();
                    }
                },
            },
        ]);
    }

    function editarSenha(senhaItem: SenhaData) {
        setNome(senhaItem.nome);
        setSenha(senhaItem.senha);
        setOrigem(senhaItem.origem || '');
        setIdEditando(senhaItem.id);
        setEditando(true);
        setFormVisible(true);
    }

    function renderSenha({ item }: { item: SenhaData }) {
        const mostrarSenha = senhasVisiveis[item.id] || false;

        const toggleSenhaVisivel = () => {
            setSenhasVisiveis(prev => ({
                ...prev,
                [item.id]: !prev[item.id]
            }));
        };

        return (
            <View style={styles.itemTarefa}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.nomeTarefa}>{item.nome}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item.ativa ? (
                            <View style={styles.emblemaConcluido}>
                                <Text style={styles.textoEmblemaConcluido}>Ativa</Text>
                            </View>
                        ) : (
                            <View style={styles.emblemaItem}>
                                <Text style={styles.textoEmblema}>Inativa</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={styles.descricaoTarefa}>
                            Senha: {mostrarSenha ? item.senha : '••••••••'}
                        </Text>
                        <TouchableOpacity onPress={toggleSenhaVisivel} style={{ marginLeft: 10 }}>
                            <Ionicons
                                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                                size={18}
                                color={colors.blue}
                            />
                        </TouchableOpacity>
                    </View>

                    {item.origem && (
                        <Text style={styles.descricaoTarefa}>
                            Origem: {item.origem}
                        </Text>
                    )}
                </View>

                <Text style={styles.dataTarefa}>
                    Criada em: {item.data_criacao ? new Date(item.data_criacao).toLocaleDateString('pt-BR') : 'Não definida'}
                </Text>

                <View style={styles.linhaAcoes}>
                    <TouchableOpacity onPress={() => editarSenha(item)}>
                        <Ionicons name="create-outline" size={20} color={colors.blue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirSenha(item.id)} style={{ marginLeft: 15 }}>
                        <Ionicons name="trash-outline" size={20} color={colors.blue} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.containerComPadding}>
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.botaoDropdown}>
                <Text style={styles.textoBotaoDropdown}>
                    <Ionicons name="person-outline" size={24} color={colors.white} /> Perfil
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={menuVisible} animationType="fade">
                <TouchableOpacity
                    style={styles.sobreposicaoModal}
                    onPress={() => setMenuVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.menuDropdown}>
                        <TouchableOpacity style={styles.itemMenu}>
                            <Text style={styles.dadosUsuarioMenu}>Nome: {nomeUsuario}</Text>
                            <Text style={styles.dadosUsuarioMenu}>Email: {emailUsuario}</Text>
                            <View style={{ height: 1, backgroundColor: colors.grayStrong, marginVertical: 8, }}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={EncerrarSessao} style={styles.itemMenu}>
                            <Text style={styles.textoMenu}>Encerrar Sessão</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('https://portfolio-react-iota-red.vercel.app/');
                                setMenuVisible(false);
                            }}
                            style={styles.itemMenu}
                        >
                            <Text style={styles.textoMenu}>Visitar site do dev</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.containerTarefas}>
                <Text style={styles.tituloTarefas}>Minhas Senhas</Text>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : senhas.length === 0 ? (
                    <Text>Nenhuma senha encontrada.</Text>
                ) : (
                    <FlatList data={senhas} keyExtractor={(item) => item.id.toString()} renderItem={renderSenha} />
                )}
            </View>

            <View style={styles.botaoAdd}>
                <TouchableOpacity
                    onPress={() => {
                        setEditando(false);
                        setNome('');
                        setSenha('');
                        setOrigem('');
                        setFormVisible(true);
                    }}
                >
                    <Ionicons name="add-circle-outline" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>

            <Modal visible={formVisible} animationType="slide" transparent>
                <View style={styles.containerFormulario}>
                    <View style={styles.caixaFormulario}>
                        <Text style={styles.rotuloNegrito}>Nome *</Text>
                        <TextInput
                            style={styles.inputSimples}
                            placeholder="Digite o nome (ex: Email, Instagram)"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.rotuloNegrito}>Senha *</Text>
                            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                                <Ionicons
                                    name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color={colors.blue}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.inputSimples}
                            placeholder="Digite a senha"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!senhaVisivel}
                        />

                        <Text style={styles.rotuloNegrito}>Origem</Text>
                        <TextInput
                            style={styles.inputSimples}
                            placeholder="Digite a origem (ex: Google, Facebook)"
                            value={origem}
                            onChangeText={setOrigem}
                        />

                        <View style={styles.acoesFormulario}>
                            <TouchableOpacity onPress={() => {
                                setFormVisible(false);
                                setNome('');
                                setSenha('');
                                setOrigem('');
                                setSenhaVisivel(false);
                                setEditando(false);
                                setIdEditando(null);
                            }}>
                                <Text style={styles.cancelar}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSalvar}>
                                <Text style={styles.salvar}>{editando ? 'Atualizar' : 'Salvar'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
