export default class CompraSchema {
    static schema = {
        name: 'Compra',
        properties: { 
            comprador: 'string',
            cartao: 'string',
            produto: 'string',
            valor: 'float',
            parcelas: 'int',
            dataCompra: 'date',
            primeiraPrestacao: 'date',
            ultimaPrestacao: 'date'
        }
    }
}