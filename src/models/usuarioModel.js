const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String
}, {collection: 'usuarios'});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;