const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generadorJWT');

const createUsuario = async (req, res) => {

    const usuario = req.body

    // if (!usuario.nombre) {
    //     return res.status(500).json({
    //         ok: false,
    //         msg: 'El nombre es requerido'
    //     })
    // }

    // if (!usuario.email) {
    //     return res.status(500).json({
    //         ok: false,
    //         msg: 'El email es requerido'
    //     })
    // }

    // if (!usuario.password) {
    //     return res.status(500).json({
    //         ok: false,
    //         msg: 'El password es requerido'
    //     })
    // }

    const u = new Usuario(usuario)

    const salt = bcrypt.genSaltSync()

    u.password = bcrypt.hashSync(u.password, salt)

    const usuarioDb = await u.save()

    const token = await generarJWT(usuarioDb.id, usuarioDb.nombre)

    res.json({
        ok: true,
        usuario: usuarioDb,
        token: token
    })

}

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll()

    res.json({
        ok: true,
        usuarios
    })
}

module.exports = {
    createUsuario,
    getUsuarios
}