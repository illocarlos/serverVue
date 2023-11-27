const User = require('../models/User.model')
const { validationResult } = require("express-validator")

const signUpUser = (req, res, next) => {

    const { username, email, password } = req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    User
        .create({ username, email, password })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}


const logInUser = (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }
    console.log({ email })
    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.status(200).json({ OK: "BIENVENIDO", authToken })

            }
            else {
                res.status(401).json({ message: "Incorrect password" });
            }

        })
        .catch(err => next(err));
}

const verifyUser = (req, res, next) => {

    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signUpUser,
    logInUser,
    verifyUser

}