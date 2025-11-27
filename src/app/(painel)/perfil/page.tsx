import {
  View, Text, TextInput,
  TouchableOpacity, Modal, Alert,
  FlatList, Linking, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../constants/Colors';
import { estilosGlobais as styles } from '../../../styles/globalStyles';

const { height } = Dimensions.get("window");

export async function SalvarTarefa(
  nome: string,
  descricao: string,
  user_id: string
) {
  if (!nome) {
    Alert.alert('Erro', 'Por favor, preencha o nome da tarefa.');
    return false;
  }

  const novaTarefa = {
    nome,
    descricao,
    data_inicio: new Date().toISOString().split('T')[0],
    status: 'pendente',
    user_id,
  };

  const { error } = await supabase.from('tarefas').insert([novaTarefa]);
  if (error) {
    Alert.alert('Erro ao salvar tarefa', error.message);
    return false;
  } else {
    Alert.alert('Sucesso', 'Tarefa salva com sucesso!');
    return true;
  }
}

export default function Perfil() {
  const { setUser, user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tarefas, setTarefas] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(user?.user_metadata.name || 'Usuário');
  const [emailUsuario, setEmailUsuario] = useState(user?.email || 'email não disponível');

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

  useEffect(() => {
    carregarTarefas();
  }, [user]);

  async function handleSalvar() {
    if (!user) return;

    if (editando && idEditando !== null) {
      const { error } = await supabase
        .from('tarefas')
        .update({ nome, descricao })
        .eq('id', idEditando);

      if (error) {
        Alert.alert('Erro ao atualizar tarefa', error.message);
        return;
      }

      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
    } else {
      const sucesso = await SalvarTarefa(nome, descricao, user.id);
      if (!sucesso) return;
    }

    setFormVisible(false);
    setNome('');
    setDescricao('');
    setEditando(false);
    setIdEditando(null);
    carregarTarefas();
  }

  async function excluirTarefa(id: number) {
    Alert.alert('Confirmar exclusão', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase.from('tarefas').delete().eq('id', id);
          if (error) {
            Alert.alert('Erro ao excluir tarefa', error.message);
          } else {
            carregarTarefas();
          }
        },
      },
    ]);
  }

  function editarTarefa(tarefa: any) {
    setNome(tarefa.nome);
    setDescricao(tarefa.descricao);
    setIdEditando(tarefa.id);
    setEditando(true);
    setFormVisible(true);
  }

  async function marcarComoConcluida(id: number) {
    const dataConclusao = new Date().toISOString().split('T')[0];

    const { error } = await supabase
      .from('tarefas')
      .update({ status: 'concluido', data_conclusao: dataConclusao })
      .eq('id', id);

    if (error) {
      Alert.alert('Erro ao concluir tarefa', error.message);
    } else {
      carregarTarefas();
    }
  }

  function renderTarefa({ item }: { item: any }) {
    return (
      <View style={styles.itemTarefa}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              styles.nomeTarefa,
              item.status === 'concluido' ? { textDecorationLine: 'line-through', color: colors.grayStrong } : {},
            ]}
          >
            {item.nome}
          </Text>

          {item.status === 'pendente' ? (
            <TouchableOpacity onPress={() => marcarComoConcluida(item.id)} style={styles.botaoConcluir}>
              <Text style={styles.textoBotaoConcluir}>Concluir</Text>
            </TouchableOpacity>
          ) : (
            <Ionicons name="checkmark-done-outline" size={24} color={colors.green} />
          )}
        </View>

        {item.descricao ? (
          <Text
            style={[
              styles.descricaoTarefa,
              item.status === 'concluido' ? { textDecorationLine: 'line-through', color: colors.grayStrong } : {},
            ]}
          >
            {item.descricao}
          </Text>
        ) : null}
        <Text style={styles.dataTarefa}>
          Data de início: {item.data_inicio ? item.data_inicio : 'Não definida'}
        </Text>
        {item.data_conclusao && (
          <Text style={styles.dataTarefa}>
            Data de conclusão: {item.data_conclusao}
          </Text>
        )}

        <View style={styles.linhaAcoes}>
          <TouchableOpacity onPress={() => editarTarefa(item)}>
            <Ionicons name="create-outline" size={20} color={colors.blue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirTarefa(item.id)} style={{ marginLeft: 15 }}>
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
        <Text style={styles.tituloTarefas}>Minhas Tarefas</Text>
        {loading ? (
          <Text>Carregando...</Text>
        ) : tarefas.length === 0 ? (
          <Text>Nenhuma tarefa encontrada.</Text>
        ) : (
          <FlatList data={tarefas} keyExtractor={(item) => item.id.toString()} renderItem={renderTarefa} />
        )}
      </View>

      <View style={styles.botaoAdd}>
        <TouchableOpacity
          onPress={() => {
            setEditando(false);
            setNome('');
            setDescricao('');
            setFormVisible(true);
          }}
        >
          <Ionicons name="add-circle-outline" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.botaoAddListacompra}>
        <TouchableOpacity
          onPress={() => router.push('/(painel)/perfil/listacompra')}
        >
          <Ionicons name="add-circle-outline" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Modal visible={formVisible} animationType="slide" transparent>
        <View style={styles.containerFormulario}>
          <View style={styles.caixaFormulario}>
            <Text style={styles.rotuloNegrito}>Nome da Tarefa *</Text>
            <TextInput
              style={styles.inputSimples}
              placeholder="Digite o nome"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.rotuloNegrito}>Descrição</Text>
            <TextInput
              style={styles.inputSimples}
              placeholder="Digite a descrição"
              value={descricao}
              onChangeText={setDescricao}
            />

            <View style={styles.acoesFormulario}>
              <TouchableOpacity onPress={() => setFormVisible(false)}>
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
