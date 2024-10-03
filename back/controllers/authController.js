const Usuario = require('../model/Usuario');

const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generadorJWT');

const admin = require('firebase-admin');

const login = async (req, res) => {
    const {firebaseToken} = req.body

    try {
        await admin.auth().verifyIdToken(firebaseToken).then(decodedToken => {
            const uid = decodedToken.uid;
            console.log(uid)
        }).catch(error => {
            return res.status(400).json({
                ok: false,
                msg: 'Token invalido'
            })
        })

        return res.json({
            ok: true
        })

        // const usuarioDB = await Usuario.findOne({ where: { email: email}})

        // console.log(usuarioDB)

        // if (usuarioDB) {
        //     const validarPassword = bcrypt.compareSync(password,usuarioDB.password)

        //     if (!validarPassword) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Usuario o contraseña incorrecta'
        //         })
        //     } else {
        //         const token = await generarJWT(usuarioDB.id, usuarioDB.nombre)

        //         res.json({
        //             ok: true,
        //             usuario: usuarioDB,
        //             token
        //         })
        //     }
        // } else {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            })
        // }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

module.exports = {
    login
}