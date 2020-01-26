const datas = {
    0: "Janeiro", 1: "Fevereiro", 2: "Março", 3: "Abril", 4: "Maio",
    5: "Junho", 6: "Julho", 7: "Agosto", 8: "Setembro", 9: "Outubro", 10: "Novembro", 11: "Dezembro"
}

function dateToString(date) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

function stringToDate(data) {
    let dados = data.split("/")
    return new Date(`${dados[1]}-${dados[0]}-${dados[2]}`)
}   

function pegarMes(date) {
    return `${datas[date.getMonth()]} de ${date.getFullYear()}`
}


module.exports = { dateToString, stringToDate, pegarMes }