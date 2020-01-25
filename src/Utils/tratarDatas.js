function dateToString(date) {
    return `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
}

function stringToDate(data) {
    let dados = data.split("/")
    return new Date(`${dados[1]}-${dados[0]}-${dados[2]}`)
}   

module.exports = { dateToString, stringToDate }