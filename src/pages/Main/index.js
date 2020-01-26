import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Picker, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import DateTimerPicker from '@react-native-community/datetimepicker'
import { styles, estilos, addCompra } from './styles'
import getRealm from '~/services/realm'
import { dateToString, pegarMes } from '~/Utils/tratarDatas'
import { primeiraPrestacao, ultimaPrestacao } from '~/pages/Pagamento/parcelas'

function Main({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [cartao, setCartao] = useState("none")
  const [comprador, setComprador] = useState("")
  const [dataCompra, setDataCompra] = useState(new Date())
  const [produto, setProduto] = useState("")
  const [valor, setValor] = useState(0)
  const [parcelas, setParcelas] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [buscarComprador, setBuscarComprador] = useState("")
  const [compras, setCompras] = useState([])

  function abrirJanelaCompra() {
    setVisible(true)
  }


  async function buscarComprasComprador(comprador) {
    const realm = await getRealm()
    const data = realm.objects('Compra').sorted('id', false).filtered(`comprador CONTAINS[c] "${comprador}"`)
    let qtdElementos = 6

    if (data.length < 6) {
      qtdElementos = data.length
    }

    setCompras([...data.slice(data.length - qtdElementos, data.length)])
  }

  async function loadCompras() {
    const realm = await getRealm()
    const quantElementos = realm.objects('Compra').length
    let reduzir = 6

    if (quantElementos < 6) {
      reduzir = quantElementos
    }

    const data = realm.objects('Compra').sorted('id', false).slice(realm.objects('Compra').length - reduzir, realm.objects('Compra').length)
    console.log(data);
    setCompras([...data])
  }

  useEffect(() => {
    loadCompras()
  }, [])

  function criarCompra() {
    const compra = {
      comprador,
      cartao,
      produto,
      valor,
      parcelas,
      dataCompra,
      primeiraPrestacao: primeiraPrestacao(dataCompra),
      ultimaPrestacao: ultimaPrestacao(primeiraPrestacao(dataCompra), parcelas),
      valorPrestacao: (valor / parcelas).toFixed(2)
    }
    return compra
  }



  async function excluirCompra(idCompra) {
    const realm = await getRealm()
    const compra = realm.objects('Compra').filtered('id = $0', idCompra)

    Alert.alert(
      'Confirmar exclusão',
      'Deseja excluir essa compra?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            realm.write(() => {
              realm.delete(compra)
            })
            if (buscarComprador) {
              buscarComprasComprador(buscarComprador)
            } else {
              loadCompras()
            }
          }
        },
      ],
      { cancelable: false },
    )
  }

  function mostrarCompras(compra) {
    return (
      <View
        key={compra.id}
        style={styles.compra}>
        <View style={styles.botoesCompra}>
          <TouchableOpacity style={styles.botoesModificarCompra} onPress={() => {
            excluirCompra(compra.id)
          }}>
            <Icon name="delete" size={14} color="#084d6e"></Icon>
          </TouchableOpacity>
        </View>
        <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>{compra.comprador}</Text></Text>
        <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>{compra.cartao}</Text></Text>
        <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>{compra.produto}</Text></Text>
        <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ {compra.valor}</Text></Text>
        <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>{compra.parcelas}</Text></Text>
        <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>{dateToString(compra.dataCompra)}</Text></Text>
        <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.primeiraPrestacao)}</Text></Text>
        <Text style={styles.produto}>Última Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.ultimaPrestacao)}</Text></Text>
        <Text style={styles.produto}>Valor da Prestação: <Text style={styles.produtoVendido}>R$: {(compra.valorPrestacao).toFixed(2)}</Text></Text>

      </View>
    )
  }

  async function saveCompra() {

    const compra = criarCompra()
    const data = {
      comprador: compra.comprador,
      cartao: compra.cartao,
      produto: compra.produto,
      valor: Number.parseFloat(compra.valor),
      parcelas: compra.parcelas,
      dataCompra: compra.dataCompra,
      primeiraPrestacao: compra.primeiraPrestacao,
      ultimaPrestacao: compra.ultimaPrestacao,
      valorPrestacao: Number.parseFloat(compra.valorPrestacao)
    }

    const realm = await getRealm()

    if (!realm.objects('Compra').length) {
      data.id = 1
    } else {
      const ultimoElemento = realm.objects('Compra').sorted('id', false).slice(realm.objects('Compra').length - 1, realm.objects('Compra').length)
      data.id = ultimoElemento.shift().id + 1
    }

    realm.write(() => {
      realm.create('Compra', data)
    })
  }

  async function handleAddCompra() {
    try {
      await saveCompra()
      zerarCampos("")
    } catch (e) {
      console.log(e)
    }
  }

  function zerarCampos() {
    setCartao("none")
    setComprador("")
    setDataCompra(new Date())
    setProduto("")
    setValor(0)
    setParcelas(0)
  }

  function escolherData(show) {
    if (show) {
      return (<DateTimerPicker mode={"date"} display="calendar" value={new Date()} locale="es" onChange={(event, date) => {
        setShowCalendar(false)
        if (date != undefined) {
          setDataCompra(date)
        }
      }} style={{ backgroundColor: "#000" }}></DateTimerPicker>
      )
    }
  }

  return (
    <LinearGradient colors={["#e2a79f", "#fa7f72"]}
      style={estilos.linearGradient}>
      <View style={estilos.formComprador}>
        <TextInput
          placeholder="Digite o nome do comprador...."
          style={estilos.buscarComprador}
          value={buscarComprador}
          onChangeText={setBuscarComprador}
        ></TextInput>
        <TouchableOpacity onPress={() => {
          buscarComprasComprador(buscarComprador)
        }}>
          <Icon name="search" size={20} color={"#000"} style={estilos.botaoBuscar}></Icon>
        </TouchableOpacity>
      </View>
      <Text style={estilos.cabecalho}>Últimas Compras Adicionadas</Text>
      <ScrollView style={styles.compras}>
        {compras.map(mostrarCompras)}
      </ScrollView>

      <View style={estilos.bottomButtons}>
        <TouchableOpacity onPress={() => {
          setBuscarComprador("")
          navigation.navigate('Profile')
        }}>
          <Icon name="attach-money" size={26} color={"#084d6e"} style={estilos.botoesFinais}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          abrirJanelaCompra()
        }}>
          <Icon name="add" size={26} color={"#084d6e"} style={estilos.botoesFinais}></Icon>
        </TouchableOpacity>
      </View>

      <Modal isVisible={visible} style={addCompra.caixaPrincipal} animationIn="zoomIn" animationOut="zoomOut">
        <LinearGradient colors={["#fa7f72", "#e2a79f"]} style={{ flex: 1, borderRadius: 15 }}>
          <Text style={addCompra.cabecalho}>Adicionar Nova Compra</Text>
          <View style={addCompra.containerInformacoes}>
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="comprador">Comprador: </Text>
              <TextInput
                style={addCompra.inputCompra}
                value={comprador}
                onChangeText={setComprador}></TextInput>
            </View >
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="produto">Produto: </Text>
              <TextInput
                style={addCompra.inputCompra}
                value={produto}
                onChangeText={setProduto}
              ></TextInput>
            </View>
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="valorCompra">Valor: </Text>
              <TextInput
                style={addCompra.inputCompra}
                value={valor}
                onChangeText={setValor}
                keyboardType={"number-pad"} type={"cc-number"}></TextInput>
            </View>
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="parcelas">Parcelas: </Text>
              <TextInput
                style={addCompra.inputCompra}
                value={parcelas}
                onChangeText={(e) => {
                  setParcelas(Number.parseInt(e))
                }}
                keyboardType={"number-pad"}
                type={"cc-number"}></TextInput>
            </View>
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="dataCompra">Data Compra: </Text>
              <TextInput
                style={addCompra.inputDataCompra}
                editable={false}
                defaultValue={dateToString(dataCompra)}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setShowCalendar(true)
                }}>
                <Icon style={addCompra.selecionarData} name="date-range" size={14}></Icon>
              </TouchableOpacity>
              {escolherData(showCalendar)}
            </View>
            <View style={addCompra.formInformacao}>
              <Text
                style={addCompra.chaveCompra}
                title="cartao">Cartão: </Text>
              <Picker
                selectedValue={cartao}
                onValueChange={((itemValue, itemPosition) => {
                  setCartao(itemValue)
                })}
                prompt={"Selecione o cartão"}
                style={addCompra.selecionarCartao}
                mode={"dropdown"}>
                <Picker.Item
                  label="Selecione o cartão"
                  value="none"
                ></Picker.Item>
                <Picker.Item
                  label="Visa"
                  value="Visa"></Picker.Item>
                <Picker.Item
                  label="Hipercard"
                  value="Hipercard"></Picker.Item>
              </Picker>
            </View>

          </View>
          <View style={addCompra.formBotoesFinais}>
            <TouchableOpacity onPress={() => {
              setVisible(false)
            }}>
              <Icon name="close" color="#990000" style={addCompra.botoesFinais}></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              handleAddCompra()
              setVisible(false)
              loadCompras()
            }}>
              <Icon name="check" color="#009900" style={addCompra.botoesFinais}></Icon>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  )
}

export default Main
