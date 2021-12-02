var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/qualicorp_eg_db')
var Schema = mongoose.Schema

var clientDataSchema = new Schema({
    nome: {
        type: String, required: true
    },
    idade: String,
    email: String,
    number: String,
    documento: String
},
{
    collection: 'clients'
})

var Clientes = mongoose.model('ClientData', clientDataSchema)

module.exports = Clientes