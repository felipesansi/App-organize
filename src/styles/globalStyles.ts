import { StyleSheet } from 'react-native';
import colors from '../constants/Colors';

export const estilosGlobais = StyleSheet.create({
  containerSplash: {
   flex: 1,
   backgroundColor: colors.Fundo,
   justifyContent: 'center',
    alignItems: 'center',


  },
  tituloSplash: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: colors.Texto,
    textAlign: 'center',
    marginTop: 24,
    
  },
  subtituloSplash: {
    fontSize: 16,
    color: colors.TextosSecundarios,
    textAlign: 'center',
    marginTop: 12,
  },
  botaoSplash: {
    backgroundColor: colors.Marca,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  textoBotaoSplash: {
    color: colors.white,
    fontWeight: '700',
  },

  container: {
    flex: 1,
    backgroundColor: colors.Fundo,
  },
  containerComPadding: {
    flex: 1,
    paddingTop: 137,
    paddingHorizontal: 26,
    backgroundColor: colors.FundoSuave,
  },
  scrollView: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.Marca,
  },
  textoBold: {
    fontWeight: 'bold',
    color: colors.Texto,
  },
  texto: {
    color: colors.Texto,
  },
  botao: {
    backgroundColor: colors.Marca,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: colors.white,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.Texto,
    fontSize: 16,
  },
  itemTarefa: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  nomeTarefa: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.Texto,
  },
  descricaoTarefa: {
    fontSize: 14,
    color: colors.TextosSecundarios,
    marginTop: 6,
  },
  dataTarefa: {
    marginTop: 8,
    fontSize: 12,
    color: colors.grayStrong,
  },
  linhaAcoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  acoesItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 10,
  },
  botaoDropdown: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.Marca,
  },
  textoBotaoDropdown: {
    color: colors.white,
    fontWeight: '700',
  },
  sobreposicaoModal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDropdown: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
  },
  itemMenu: {
    paddingVertical: 8,
  },
  dadosUsuarioMenu: {
    color: colors.Texto,
    fontSize: 14,
  },
  textoMenu: {
    color: colors.Texto,
    fontSize: 15,
    fontWeight: '600',
  },
  containerTarefas: {
    flex: 1,
  },
  tituloTarefas: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.Texto,
    marginBottom: 12,
  },
  botaoAdd: {
    position: 'absolute',
    right: 20,
    bottom: 26,
    borderRadius: 28,
    backgroundColor: colors.Marca,
    padding: 6,
  },
  containerFormulario: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  caixaFormulario: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
  },
  rotuloNegrito: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.Texto,
    marginBottom: 8,
  },
  inputSimples: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.Fundo,
    borderRadius: 10,
    padding: 12,
    color: colors.Texto,
    marginBottom: 14,
  },
  acoesFormulario: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cancelar: {
    color: colors.grayStrong,
    fontWeight: '700',
    marginRight: 18,
  },
  salvar: {
    color: colors.Marca,
    fontWeight: '700',
  },
  emblemaConcluido: {
    backgroundColor: '#D9F7E8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  emblemaItem: {
    backgroundColor: '#EAF2FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  textoEmblemaConcluido: {
    color: '#1A7F5A',
    fontSize: 11,
    fontWeight: '700',
  },
  textoEmblema: {
    color: '#3B82F6',
    fontSize: 11,
    fontWeight: '700',
  },
  botaoConcluir: {
    backgroundColor: colors.Sucesso,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  textoBotaoConcluir: {
    color: colors.white,
    fontWeight: '700',
  },
  botaoAcao: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  botaoConcluido: {
    backgroundColor: '#E7F9EF',
  },
  botaoExcluir: {
    backgroundColor: '#FDECEC',
  },
  textoBotaoConcluido: {
    color: '#1A7F5A',
    fontWeight: '700',
    fontSize: 12,
  },
  textoBotaoExcluir: {
    color: '#D92D20',
    fontWeight: '700',
    fontSize: 12,
  },
  cabecalho: {
    marginBottom: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.Texto,
  },
  subtitulo: {
    marginTop: 6,
    color: colors.TextosSecundarios,
    fontSize: 14,
  },
  cartaoFormulario: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  tituloFormulario: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.Texto,
    marginBottom: 12,
  },
  grupoInput: {
    marginBottom: 14,
  },
  rotulo: {
    color: colors.Texto,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  botaoAdicionar: {
    backgroundColor: colors.Marca,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  containerCarregamento: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  textoCarregamento: {
    marginTop: 8,
    color: colors.grayStrong,
    fontSize: 14,
  },
  secao: {
    marginBottom: 18,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.Texto,
    marginBottom: 12,
  },
  estadoVazio: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  textoVazio: {
    color: colors.Texto,
    fontWeight: '700',
  },
  subtextoVazio: {
    color: colors.grayStrong,
    fontSize: 12,
    marginTop: 6,
  },
  cartaoItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECF2',
  },
  cabecalhoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flex: 1,
    marginRight: 8,
  },
  nomeItem: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.Texto,
  },
  observacoesItem: {
    color: colors.grayStrong,
    fontSize: 12,
    marginTop: 6,
  },
  quantidadeItem: {
    color: colors.grayStrong,
    fontSize: 12,
    marginTop: 4,
  },
  dataItem: {
    color: colors.grayStrong,
    fontSize: 12,
    marginTop: 6,
  },
  cartaoConcluido: {
    opacity: 0.85,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
  },
});

export default estilosGlobais;
