const datas = {
    0: "Janeiro", 1: "Fevereiro", 2: "Março", 3: "Abril", 4: "Maio",
    5: "Junho", 6: "Julho", 7: "Agosto", 8: "Setembro", 9: "Outubro", 10: "Novembro", 11: "Dezembro"
}

function ultimaPrestacao(primeiraParcela, qtdParcelas) {
    let mesCompra = primeiraParcela.getMonth()
    let anoCompra = primeiraParcela.getFullYear()

    let mesUltimoPagamento = mesCompra + qtdParcelas

    return new Date(anoCompra, mesUltimoPagamento, 1)
}

function primeiraPrestacao(dataCompra) {
    let timeCompra = dataCompra.getTime()
    let vencimento = dataCompra.setDate(7)

    if (timeCompra >= vencimento) {
        return pegarProximoMes(dataCompra)
    } else {
        return dataCompra
    }
}

function pegarMes(date) {
    return `${datas[date.getMonth()]} de ${date.getFullYear()}`
}

function pegarProximoMes(dataAtual) {
    let mesAtual = dataAtual.getMonth() + 1
    let anoAtual = dataAtual.getFullYear()

    return new Date(anoAtual, mesAtual)
}

module.exports = { primeiraPrestacao, ultimaPrestacao, pegarMes }