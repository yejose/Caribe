const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cedulaModel = new Schema({
  cedula: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("cedulaRegistro", cedulaModel);
