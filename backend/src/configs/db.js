var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/qualicorp_eg_db')
var Schema = mongoose.Schema

var clientDataSchema = new Schema({
    nome: {
        type: String, required: true
    },
    idade: {
        type: Number, required: true
    },
    email: {
        type: String, required: true
    },
    number: {
        type: String, required: true
    },
    documento: {
        type: String, required: true
    }
},
{
    collection: 'clients'
})

var Clientes = mongoose.model('ClientData', clientDataSchema)

module.exports = Clientes