const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken")


const {
    userId,
    editUser,


} = require('../controllers/user.controller')

router.get('/:user_id', userId)
router.post('/edit/:user_id', verifyToken, editUser)


module.exports = router
