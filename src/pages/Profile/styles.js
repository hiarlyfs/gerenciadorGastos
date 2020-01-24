import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    compras: {
        display: "flex",
        flexDirection: "column",
        top: 60,
        flex: 1,
        marginBottom: 60
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
})

export default styles