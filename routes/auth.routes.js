const router = require("express").Router()
const { body } = require("express-validator")
const {
    signUpUser,
    logInUser,
    verifyUser

} = require('./../controllers/auth.controller.js')


router.post('/signup', [body('email', "formato incorrecto").isEmail()], signUpUser)
router.post('/login', logInUser)
router.get('/verify', verifyUser)

module.exports = router