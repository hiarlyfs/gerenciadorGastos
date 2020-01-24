import {StyleSheet} from 'react-native'

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

export default styles