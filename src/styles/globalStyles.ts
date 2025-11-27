import { StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/Colors';

const { height } = Dimensions.get("window");

export const estilosGlobais = StyleSheet.create({
    // ========================================
    // CONTAINERS GERAIS
    // ========================================
    container: {
        flex: 1,
        backgroundColor: colors.gray,
    },
    containerComPadding: {
        flex: 1,
        paddingTop: 60,
        alignItems: 'flex-end',
        paddingRight: 20,
        backgroundColor: colors.gray,
    },
    scrollView: {
        flex: 1,
    },

    // ========================================
    // ESTILOS DO CABEÇALHO
    // ========================================
    cabecalho: {
        paddingHorizontal: 27,
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.blue,
        marginBottom: 5,
    },
    subtitulo: {
        fontSize: 14,
        color: colors.grayStrong,
    },

    // ========================================
    // ESTILOS DO DROPDOWN / MENU
    // ========================================
    botaoDropdown: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    textoBotaoDropdown: {
        color: colors.white,
        fontSize: 16,
    },
    sobreposicaoModal: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 60,
        paddingRight: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    menuDropdown: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5,
    },
    itemMenu: {
        paddingVertical: 10,
    },
    textoMenu: {
        fontSize: 16,
        color: colors.blue,
    },
    dadosUsuarioMenu: {
        fontSize: 10,
        color: colors.blue,
        fontWeight: 'bold',
    },

    // ========================================
    // ESTILOS DE FORMULÁRIO
    // ========================================
    cartaoFormulario: {
        backgroundColor: colors.white,
        margin: 20,
        padding: 20,
        borderRadius: 20,
        shadowColor: colors.blue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    tituloFormulario: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.blue,
        marginBottom: 20,
    },
    containerFormulario: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20,
    },
    caixaFormulario: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
    },
    grupoInput: {
        marginBottom: 16,
    },
    rotulo: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.grayStrong,
        marginBottom: 8,
    },
    rotuloNegrito: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: colors.blue,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    inputSimples: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingVertical: 5,
        marginBottom: 10,
    },
    acoesFormulario: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },

    // ========================================
    // BOTÕES
    // ========================================
    botaoAdicionar: {
        backgroundColor: colors.blue,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: colors.blue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    textoBotaoAdicionar: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoAdd: {
        position: "absolute",
        bottom: height < 700 ? 70 : 80,
        right: 20,
        backgroundColor: colors.green,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
    botaoAddListacompra: {
        position: "absolute",
        bottom: height < 700 ? 70 : 80,
        right: 89,
        backgroundColor: colors.green,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
    botaoConcluir: {
        backgroundColor: colors.green,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textoBotaoConcluir: {
        color: colors.white,
        fontWeight: 'bold',
    },
    cancelar: {
        color: colors.blue,
        fontWeight: 'bold',
    },
    salvar: {
        color: colors.green,
        fontWeight: 'bold',
    },
    botaoAcao: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    botaoConcluido: {
        backgroundColor: colors.green,
    },
    textoBotaoConcluido: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
    botaoExcluir: {
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.red,
    },
    textoBotaoExcluir: {
        color: colors.red,
        fontWeight: '600',
        fontSize: 14,
    },

    // ========================================
    // ESTILOS DE CARREGAMENTO
    // ========================================
    containerCarregamento: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    textoCarregamento: {
        marginTop: 10,
        fontSize: 16,
        color: colors.grayStrong,
    },

    // ========================================
    // ESTILOS DE SEÇÃO E CONTEÚDO
    // ========================================
    secao: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    tituloSecao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.blue,
        marginBottom: 12,
    },
    containerTarefas: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    tituloTarefas: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    // ========================================
    // CARTÕES DE ITEM (Tarefas / Lista de Compras)
    // ========================================
    cartaoItem: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    itemTarefa: {
        backgroundColor: colors.gray,
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    cartaoConcluido: {
        backgroundColor: colors.green,
        borderWidth: 1,
        borderColor: colors.green,
    },
    cabecalhoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    infoItem: {
        flex: 1,
    },
    nomeItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.blue,
        marginBottom: 4,
    },
    nomeTarefa: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantidadeItem: {
        fontSize: 14,
        color: colors.grayStrong,
        marginBottom: 4,
    },
    observacoesItem: {
        fontSize: 14,
        color: colors.grayStrong,
        marginBottom: 4,
    },
    descricaoTarefa: {
        fontSize: 14,
        color: colors.grayStrong,
        marginTop: 5,
    },
    dataItem: {
        fontSize: 12,
        color: colors.grayStrong,
    },
    dataTarefa: {
        fontSize: 12,
        color: colors.grayStrong,
        marginTop: 5,
        fontStyle: 'italic',
    },
    textoConcluido: {
        textDecorationLine: 'line-through',
        color: colors.grayStrong,
    },
    acoesItem: {
        flexDirection: 'row',
        gap: 8,
    },
    linhaAcoes: {
        flexDirection: 'row',
        marginTop: 10,
    },

    // ========================================
    // EMBLEMAS
    // ========================================
    emblemaItem: {
        backgroundColor: colors.gray,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    textoEmblema: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.orange,
    },
    emblemaConcluido: {
        backgroundColor: colors.gray,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    textoEmblemaConcluido: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.green,
    },

    // ========================================
    // ESTADOS VAZIOS
    // ========================================
    estadoVazio: {
        backgroundColor: colors.white,
        padding: 30,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.gray,
        borderStyle: 'dashed',
    },
    textoVazio: {
        fontSize: 16,
        color: colors.grayStrong,
        fontWeight: '600',
    },
    subtextoVazio: {
        fontSize: 14,
        color: colors.grayStrong,
        marginTop: 4,
    },
});
