function ultimaPrestacao(primeiraParcela, qtdParcelas) {
    let mesCompra = primeiraParcela.getMonth()
    let anoCompra = primeiraParcela.getFullYear()

    let mesUltimoPagamento = mesCompra + qtdParcelas - 1

    return new Date(anoCompra, mesUltimoPagamento, 25)
}

function primeiraPrestacao(dataCompra) {
    let vencimento = new Date(dataCompra)
    vencimento.setDate(6)

    if (dataCompra > vencimento) {
        return pegarProximoMes(dataCompra)
    } else {
        return dataCompra
    }
}

function pegarProximoMes(dataAtual) {
    let mesAtual = dataAtual.getMonth() + 1
    let anoAtual = dataAtual.getFullYear()

    return new Date(anoAtual, mesAtual)
}

module.exports = { primeiraPrestacao, ultimaPrestacao}