const User = require('../models/User.model')


const userId = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}


const editUser = (req, res, next) => {

    const { user_id } = req.params
    const { userData } = req.body

    User
        .findByIdAndUpdate(user_id, userData)
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}







module.exports = {
    userId,
    editUser,
}