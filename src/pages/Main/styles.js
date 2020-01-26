import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    compras: {
        display: "flex",
        flexDirection: "column",
        top: 50,
        flex: 1,
        marginBottom: 50
    },

    compra: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        borderColor: "#000",
        elevation: 2,
        alignItems: "stretch",
        paddingVertical: 7,
        marginBottom: 10,
        flex: 1,
    },

    produto: {
        color: "#084d6e",
        paddingHorizontal: 10,
        fontWeight: "bold"
    },
    produtoVendido: {
        fontWeight: "normal"
    },

    botoesCompra: {
        display: "flex",
        flexDirection: "row",
        right: 10,
        top: 7,
        position: "absolute"
    },

    botoesModificarCompra: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        marginLeft: 10,
        zIndex: 5
    },

    selecionarMes: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#000",
        elevation: 2,
    },

    cabecalhoMes: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12
    },

    meses: {
        flex: 1,
        width: 80,
        marginTop: 2
    },
    buscarComprador: {
        backgroundColor: "#fff",
        color: "#000",
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40
    },
    formComprador: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        top: 60.

    },
    botaoBuscar: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 5,
        top: 5
    },

    total: {
        fontSize: 22,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 35,
        right: 5,
        borderRadius: 25,
        paddingHorizontal: 10
    }
})


const estilos = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    buscarComprador: {
        backgroundColor: "#fff",
        color: "#000",
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 5,
        height: 40
    },
    formComprador: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        top: 15,
    },
    botaoBuscar: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        marginTop: 5,
        marginHorizontal: 5,
    },

    cabecalho: {
        top: 40,
        fontSize: 20,
        color: "#084d8e",
        textAlign: "center",
        marginTop: 30
    },
    bottomButtons: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: 10,
        bottom: 30,
        borderRadius: 25,
    },

    botoesFinais: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 2,
        marginLeft: 7
    },
})

const addCompra = StyleSheet.create({
    cabecalho: {
        fontSize: 26,
        textAlign: "center",
        top: 10
    },

    caixaPrincipal: {
        marginTop: (Dimensions.get('window').height / 4) - 20,
        maxHeight: 340,
    },

    selecionarCartao: {
        height: 25,
        width: 200,
    },

    formInformacao: {
        display: "flex",
        flexDirection: "row",
        height: 40
    },

    containerInformacoes: {
        display: "flex",
        flexDirection: "column",
        top: 30,
        marginLeft: 10,
    },

    chaveCompra: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8
    },

    dataCompra: {
        width: 20,
        height: 100,
    },

    inputCompra: {
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#000",
        borderRadius: 25,
        height: 25,
        width: 200,
        paddingHorizontal: 5,
        paddingVertical: 0,
        marginTop: 0,
    },

    selecionarData: {
        backgroundColor: "#fff",
        marginLeft: 15,
        marginTop: 0,
        borderRadius: 20,
        padding: 7,
    },

    formBotoesFinais: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
        right: 10,
        zIndex: 2
    },

    botoesFinais: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 20,
        marginLeft: 10
    },

    inputDataCompra: {
        color: "#000",
        padding: 0,
        textAlignVertical: "bottom",
        height: 25
    }
})

module.exports = {estilos, styles, addCompra}