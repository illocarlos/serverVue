const router = require("express").Router()


const {
    userId,
    editUser,


} = require('../controllers/user.controller')

router.get('/:user_id', userId)
router.post('/edit/:user_id', editUser)


module.exports = router
