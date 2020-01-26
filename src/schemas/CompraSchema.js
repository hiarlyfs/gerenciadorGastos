export default class CompraSchema {
    static schema = {
        name: 'Compra',
        primaryKey: 'id',
        properties: {
            id: 'int',
            comprador: 'string',
            cartao: 'string',
            produto: 'string',
            valor: 'float',
            parcelas: 'int',
            dataCompra: 'date',
            primeiraPrestacao: 'date',
            ultimaPrestacao: 'date',
            valorPrestacao: 'float'
        }
    }
}