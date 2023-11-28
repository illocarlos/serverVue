const router = require("express").Router()
const { body } = require("express-validator")
const { verifyToken } = require("../middlewares/verifyToken")

const {
    signUpUser,
    logInUser,
    verifyUser,
    logOutUser

} = require('./../controllers/auth.controller.js')


router.post('/signup', [body('email', "formato incorrecto").isEmail()], signUpUser)
router.post('/login', logInUser)
router.get('/verify', verifyToken, verifyUser)
router.post('/logout', logOutUser);

module.exports = router