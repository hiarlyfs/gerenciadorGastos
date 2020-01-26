import React, { useState, useEffect } from 'react'
import { View, Text, Picker, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import { styles, estilos } from './styles'
import getRealm from '~/services/realm'
import { dateToString, pegarMes } from '~/Utils/tratarDatas'

const meses = {
    "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3, "Maio": 4, "Junho": 5, "Julho": 6,
    "Agosto": 7, "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
}

function Profile({ navigation }) {
    const [mes, setMes] = useState("none")
    const [total, setTotal] = useState(0.00)
    const [comprador, setComprador] = useState("")
    const [compras, setCompras] = useState([])

    async function excluirComprasPagas() {
        const realm = await getRealm()
        let regraExclusao = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        const data = realm.objects('Compra').filtered('ultimaPrestacao < $0', regraExclusao)

        if (data.length) {
            realm.write(() => {
                realm.delete(...data)
            })
        }
    }

    useEffect(() => {
        excluirComprasPagas()
    }, [])

    function getMes(mes) {
        if (new Date().getMonth() <= meses[mes]) {
            return new Date(new Date().getFullYear(), meses[mes], 15)
        } else {
            return new Date(new Date().getFullYear() + 1, meses[mes], 15)
        }
    }

    function alertSelecioneMes() {
        Alert.alert(
            'Aviso',
            'Selecione o mês',
            [
                {
                    text: 'OK', onPress: () => { }
                },
            ],
            { cancelable: false },
        )
    }

    function alertSelecioneComprador() {
        Alert.alert(
            'Aviso',
            'Selecione o Comprador',
            [
                {
                    text: 'OK', onPress: () => { }
                },
            ],
            { cancelable: false },
        )
    }


    async function loadCompras(comprador, mes) {
        if (mes == 'none') {
            alertSelecioneMes()
        } else if (!comprador) {
            alertSelecioneComprador()
        } else {
            const dataPrestacao = getMes(mes)
            const realm = await getRealm()
            const data = realm.objects('Compra')
                .filtered('comprador CONTAINS[c] $0', comprador)
                .filtered('primeiraPrestacao <= $0', dataPrestacao)
                .filtered('ultimaPrestacao >= $0', dataPrestacao)
                .sorted('id', false)
            let somaTodasCompras = 0

            data.forEach(compra => somaTodasCompras += compra.valorPrestacao)
            setTotal(somaTodasCompras)
            setCompras([...data])
        }
    }


    function mostrarComprasBuscadas(compra) {
        return (
            <View
                key={compra.id}
                style={styles.compra}>
                <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>{compra.comprador}</Text></Text>
                <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>{compra.cartao}</Text></Text>
                <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>{compra.produto}</Text></Text>
                <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ {compra.valor}</Text></Text>
                <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>{compra.parcelas}</Text></Text>
                <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>{dateToString(compra.dataCompra)}</Text></Text>
                <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.primeiraPrestacao)}</Text></Text>
                <Text style={styles.produto}>Última Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.ultimaPrestacao)}</Text></Text>
                <Text style={styles.produto}>Valor da Prestação: <Text style={styles.produtoVendido}>R${compra.valorPrestacao.toFixed(2)}</Text></Text>

            </View>
        )
    }

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
                <TouchableOpacity onPress={() => {
                    loadCompras(comprador, mes)
                }}>
                    <Icon name="search" size={20} color={"#000"} style={estilos.botaoBuscar}></Icon>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.compras}>
                {compras.map(mostrarComprasBuscadas)}
            </ScrollView>
            <Text style={estilos.total}>Total: R${Number.parseFloat(total).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Main')
            }} style={estilos.botaoHome}>
                <Icon name="home" size={22}></Icon>
            </TouchableOpacity>
        </LinearGradient >
    )
}


export default Profile