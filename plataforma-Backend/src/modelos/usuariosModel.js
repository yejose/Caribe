const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: "string",
    required: true,
  },
  apellido: {
    type: "string",
    required: true,
  },
  contraseña: {
    type: "string",
    required: true,
  },
});

const usuarioM = mongoose.model("usuario", usuarioSchema);
exports.registroModel = usuarioM;
