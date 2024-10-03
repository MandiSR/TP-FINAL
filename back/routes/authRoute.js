const express = require("express")
const router = express.Router()

const { check } = require("express-validator")

const { validarCampos } = require("../middlewares/validarCampos")

const authController = require("../controllers/authController")

router.post('/login', 
    // [
    //     check('email', 'El mail es obligatorio').isEmail(),
    //     check('password', 'El password es obligatorio').not().isEmpty(),
    //     validarCampos
    // ],
    authController.login
)

module.exports = router