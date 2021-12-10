const { Router } = require("express");
const { validacionModel } = require("../modelos/validacionModel");
const validacionApi = Router();

validacionApi.post("/validacion", function (req, res) {
  //   res.send("entró a la ruta validacion");
  try {
    const { cedula } = req.body;
    const c = validacionModel.findOne({ cedula });
    console.log("pasó el busqueda------------------------");
    console.log(c);
    if (!c) {
      return res.status(401).send({ estado: "error", msg: "no encontrado" });
    } else {
      return ser.status(200).send({ estado: "ok", msg: "cedula encontrada" });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ estado: "error", msg: "error no hizo el proceso", error });
  }
});

exports.validacionApi = validacionApi;
