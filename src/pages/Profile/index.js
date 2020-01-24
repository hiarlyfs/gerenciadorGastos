import React, { useState } from 'react'
import { View, Text, Picker, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'

function Profile({navigation}) {
    const [mes, setMes] = useState("none")
    const [total, setTotal] = useState(0.00)
    const [comprador, setComprador] = useState("")
    return (
        <LinearGradient colors={["#e2a79f", "#fa7f72"]} style={{ flex: 1 }}>
            <View style={estilos.selecionarMes}>
                <Text style={estilos.cabecalhoMes}>Selecionar mês:</Text>
                <Picker style={estilos.meses} selectedValue={mes} onValueChange={(itemValue, itemPosition) => {
                    setMes(itemValue)
                }}>
                    <Picker.Item
                        label="Selecione o Mês"
                        value="none"
                    ></Picker.Item>
                    <Picker.Item
                        label="Janeiro"
                        value="Janeiro"></Picker.Item>
                    <Picker.Item
                        label="Fevereiro"
                        value="Fevereiro"></Picker.Item>
                    <Picker.Item
                        label="Março"
                        value="Março"></Picker.Item>
                    <Picker.Item
                        label="Abril"
                        value="Abril"></Picker.Item>
                    <Picker.Item
                        label="Maio"
                        value="Maio"></Picker.Item>
                    <Picker.Item
                        label="Junho"
                        value="Junho"></Picker.Item>
                    <Picker.Item
                        label="Julho"
                        value="Julho"></Picker.Item>
                    <Picker.Item
                        label="Agosto"
                        value="Agosto"></Picker.Item>
                    <Picker.Item
                        label="Setembro"
                        value="Setembro"></Picker.Item>
                    <Picker.Item
                        label="Outubro"
                        value="Outubro"></Picker.Item>
                    <Picker.Item
                        label="Novembro"
                        value="Novembro"></Picker.Item>
                    <Picker.Item
                        label="Dezembro"
                        value="Dezembro"></Picker.Item>
                </Picker>
            </View>
            <View style={estilos.formComprador}>
                <TextInput
                    placeholder="Digite o nome do comprador...."
                    style={estilos.buscarComprador}
                    value={comprador}
                    onChangeText={setComprador}
                ></TextInput>
                <TouchableOpacity>
                    <Icon name="search" size={20} color={"#000"} style={estilos.botaoBuscar}></Icon>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.compras}>
                <View style={styles.compra}>
                    <View style={styles.botoesCompra}>
                        <TouchableOpacity style={styles.botoesModificarCompra} onPress={() => {
                            console.log("oi")
                        }}>
                            <Icon name="edit" size={14} color="#084d6e"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botoesModificarCompra}>
                            <Icon name="delete" size={14} color="#084d6e"></Icon>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>Mamãe</Text></Text>
                    <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>Hipercard</Text></Text>
                    <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>Ferro de passar</Text></Text>
                    <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ 250</Text></Text>
                    <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>5</Text></Text>
                    <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>Janeiro</Text></Text>
                    <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>22/05/2020</Text></Text>
                    <Text style={styles.produto}>5 parcelas de 50, primera em Janeiro</Text>
                </View>

                <View style={styles.compra}>
                    <View style={styles.botoesCompra}>
                        <TouchableOpacity style={styles.botoesModificarCompra} onPress={() => {
                            console.log("oi")
                        }}>
                            <Icon name="edit" size={12} color="#084d6e"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botoesModificarCompra}>
                            <Icon name="delete" size={12} color="#084d6e"></Icon>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>Mamãe</Text></Text>
                    <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>Hipercard</Text></Text>
                    <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>Ferro de passar</Text></Text>
                    <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ 250</Text></Text>
                    <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>5</Text></Text>
                    <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>Janeiro</Text></Text>
                    <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>22/05/2020</Text></Text>
                    <Text style={styles.produto}>5 parcelas de 50, primera em Janeiro</Text>
                </View>


                <View style={styles.compra}>
                    <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>Mamãe</Text></Text>
                    <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>Hipercard</Text></Text>
                    <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>Ferro de passar</Text></Text>
                    <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ 250</Text></Text>
                    <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>5</Text></Text>
                    <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>Janeiro</Text></Text>
                    <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>22/05/2020</Text></Text>
                    <Text style={styles.produto}>5 parcelas de 50, primera em Janeiro</Text>
                </View>

                <View style={styles.compra}>
                    <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>Mamãe</Text></Text>
                    <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>Hipercard</Text></Text>
                    <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>Ferro de passar</Text></Text>
                    <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ 250</Text></Text>
                    <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>5</Text></Text>
                    <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>Janeiro</Text></Text>
                    <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>22/05/2020</Text></Text>
                    <Text style={styles.produto}>5 parcelas de 50, primera em Janeiro</Text>
                </View>

                <View style={styles.compra}>
                    <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>Mamãe</Text></Text>
                    <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>Hipercard</Text></Text>
                    <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>Ferro de passar</Text></Text>
                    <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ 250</Text></Text>
                    <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>5</Text></Text>
                    <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>Janeiro</Text></Text>
                    <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>22/05/2020</Text></Text>
                    <Text style={styles.produto}>5 parcelas de 50, primera em Janeiro</Text>
                </View>
            </ScrollView>
            <Text style={estilos.total}>Total: R${total.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Main')
            }} style={estilos.botaoHome}>
                <Icon name="home" size={22}></Icon>
            </TouchableOpacity>
        </LinearGradient >
    )
}

const estilos = StyleSheet.create({
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

    total: {
        fontSize: 22,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 35,
        right: 5,
        borderRadius: 25,
        paddingHorizontal: 10
    },

    botaoHome: {
        position: "absolute",
        bottom: 30,
        left: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        zIndex: 10

    }
})

export default Profile