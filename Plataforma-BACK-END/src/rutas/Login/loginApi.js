const { compare } = require("bcrypt");
const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const loginApi = Router();
const { sign } = require("jsonwebtoken");
require("dotenv").config();

loginApi.post("/login", async function (req, res){
    try{
        console.log("Llego a backend /login");
        const data = req.body;
        const cedula = data.cedula;
        const contrasena = data.contrasena;
        const usuario = await usuariosModel.findOne({ cedula });
        const passOK = await compare(contrasena, usuario.contrasena);
        if (passOK) {
            const token = sign(
                {
                    cedula: usuario.cedula,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET_KEY
            )
            return res.status(200).send({
                estado: "ok",
                msg: "logueado",
                token,
                rol: usuario.rol
            });
        } else{
            return res.status(500).send({
            estado: "error",
            msg: "Credenciales no validas",
            });

        }
    }catch(error){
        return res.status(401).send({ estado: "error", msg: "Credenciales no válidas", error });
    }
   

    //Ya todo esta listo, validar contraseña
})

exports.loginApi = loginApi;