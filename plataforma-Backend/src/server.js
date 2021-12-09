const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const registro = require("./modelos/registroModel");
const cedulaRegistro = require("./modelos/validacionModel");
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()

//api de prueba...
app.get("/", function (req, res) {
  res.send("Hola mundo!");
});


//conectarnos a mongoDb
mongoose
  .connect("mongodb://localhost:27017/caribe")
  .then((res) => console.log("conectado a base de datos Caribe"))
  .catch((err) => console.log("error:", err));

// API REGISTRAR
app.post("/Signup", function (req, res) {
  console.log("entró a signup");
  //captura el json
  const data = req.body;
  //se guardan los datos dentro del registroModel
  const r = new registro(data);
  //manda un mensaje si fue o no satisfactorio...
  r.save(function (error) {
    if (error) {
      res.send({
        status: "error",
        msg: "error, registro no guardado",
      });
      return false;
    }
    res.send({
      status: "ok",
      msg: "guardado satisfactoriamente",
    });
  });
  // const usu = registro.find((r) => r.nombre === req.params.nombre);
  // res.send(usu);
  // db.registro.find();
});

//API VALIDACION
app.post("/validacion", function (req, res) {
  console.log("entra en validacion");
  const { cedula } = req.body;
  console.log("trae la cedula");
  console.log({ cedula });
  cedulaRegistro.findOne({ cedula }, function (err, usu) {
    console.log("hizo la busqueda en mongoDB");

    if (err) {
      res.send({
        status: "error",
        msg: "NO tienes cedula registrada",
      });
      console.log("entró al error");
      return false;
    } else if (usu !== null) {
      res.send({
        status: "ok",
        msg: "encontrado",
        //SIMULACION
        // Flag: "";
        // plataformaRegistro(cedula){
        //   if cedula esta en plataforma {
        //     flag = "login"
        //   } else {
        //     res.sen({
        //       flag="registro"
        //     })
        //   }
        // }

        // cedula: { cedula },
      });

      console.log("entró y encontró");
    }
  });
});

// const arreglo = [];
// app.post("/Validacion", function (req, res) {
//   const ced = req.body.cedula;
//   // console.warn(ced);
//   // console.warn(req.body);
//   const c = { id: ced };
//   arreglo.push(c);
//   res.send({
//     status: "ok",
//     msg: "enviado satisfactoriamente...",
//     cedula: ced,
//     arreglo: arreglo,
//   });

//   console.log(arreglo);
// });

// const arregloSignup = [];
// app.post("/Signup", function (req, res) {
//   const nombreS = req.body.nombre;
//   const apellidoS = req.body.apellido;
//   const contraseñaS = req.body.contraseña;
//   const usuarios = { nombreS, apellidoS, contraseñaS };
//   arregloSignup.push(usuarios);
//   const usuariosP = arregloSignup.map(function (u) {
//     return u;
//   });
//   res.send({
//     status: "ok",
//     msg: "registrado correctamente",
//     nombre: nombreS,
//     apellido: apellidoS,
//     contraseña: contraseñaS,
//     arregloSignup: arregloSignup,
//     usuariosP: usuariosP,
//   });

//   console.log(arregloSignup);
//   console.log(usuariosP);
// });

app.listen(8080, function () {
  console.log("Servidor corriendo en el puerto 8080");
});
