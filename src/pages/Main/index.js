import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Picker } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import DateTimerPicker from '@react-native-community/datetimepicker'
import styles from './styles'
import getRealm from '~/services/realm'
import { dateToString, stringToDate } from '~/Utils/tratarDatas'
import {primeiraPrestacao, ultimaPrestacao, pegarMes} from '~/pages/Pagamento/parcelas'

// import { Container } from './styles';

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

  async function loadCompras() {
    const realm = await getRealm()

    const data = realm.objects('Compra').slice(realm.objects('Compra').length - 6, realm.objects('Compra').length)
    console.log(data)
    setCompras([...data].reverse())
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
      ultimaPrestacao: ultimaPrestacao(dataCompra, parcelas)
    }

    return compra
  }

  function mostrarCompras(compra) {
    return (
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
        <Text style={styles.produto}>Comprador: <Text style={styles.produtoVendido}>{compra.comprador}</Text></Text>
        <Text style={styles.produto}>Cartão: <Text style={styles.produtoVendido}>{compra.cartao}</Text></Text>
        <Text style={styles.produto}>Produto: <Text style={styles.produtoVendido}>{compra.produto}</Text></Text>
        <Text style={styles.produto}>Valor: <Text style={styles.produtoVendido}>R$ {compra.valor}</Text></Text>
        <Text style={styles.produto}>Parcelas: <Text style={styles.produtoVendido}>{compra.parcelas}</Text></Text>
        <Text style={styles.produto}>Data da Compra: <Text style={styles.produtoVendido}>{dateToString(compra.dataCompra)}</Text></Text>
        <Text style={styles.produto}>Primeira Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.primeiraPrestacao)}</Text></Text>
        <Text style={styles.produto}>Última Parcela: <Text style={styles.produtoVendido}>{pegarMes(compra.ultimaPrestacao)}</Text></Text>
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
      ultimaPrestacao: compra.ultimaPrestacao
    }

    const realm = await getRealm()

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
        <TouchableOpacity>
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
                defaultValue={`${dataCompra.getDate()}/${dataCompra.getMonth() + 1}/${dataCompra.getFullYear()}`}></TextInput>
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
    top: 15
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
  },

  containerInformacoes: {
    display: "flex",
    flexDirection: "column",
    top: 30,
    marginLeft: 10
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
      width: 160,
      backgroundColor: "#fff",
      borderRadius: 25,
      color: "#000",
      height: 20,
      paddingHorizontal: 5,
      marginTop: 3,
    },

  selecionarData: {
    backgroundColor: "#fff",
    marginLeft: 15,
    marginTop: 2,
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
    top: 0,
    padding: 0,
    marginTop: 0
  }
})


export default Main
