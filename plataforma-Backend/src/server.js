const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()

app.get("/", function (req, res) {
  res.send("Hola mundo!");
});

const arreglo = [];
app.post("/Validacion", function (req, res) {
  const ced = req.body.cedula;
  // console.warn(ced);
  // console.warn(req.body);
  const c = { id: ced };
  arreglo.push(c);
  res.send({
    status: "ok",
    msg: "enviado satisfactoriamente...",
    cedula: ced,
    arreglo: arreglo,
  });
  console.log(arreglo);
});

const arregloSignup = [];
app.post("/Signup", function (req, res) {
  const nombreS = req.body.nombre;
  const apellidoS = req.body.apellido;
  const contraseñaS = req.body.contraseña;
  const usuarios = { nombreS, apellidoS, contraseñaS };
  arregloSignup.push(usuarios);
  const usuariosP = arregloSignup.map(function (u) {
    return u;
  });
  res.send({
    status: "ok",
    msg: "registrado correctamente",
    nombre: nombreS,
    apellido: apellidoS,
    contraseña: contraseñaS,
    arregloSignup: arregloSignup,
    usuariosP : usuariosP
  });

  console.log(arregloSignup);
  console.log(usuariosP);
});

app.listen(8080, function () {
  console.log("Servidor corriendo en el puerto 8080...");
});
