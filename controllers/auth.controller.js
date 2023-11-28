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

    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "User not found." });
                return;
            }

            if (foundUser.validatePassword(password)) {
                try {
                    const authToken = foundUser.signToken();
                    //se usa para almacenar el token en la cookie 
                    res.cookie("token", authToken, {
                        httpOnly: true,
                        secure: !(process.env.MODO === "developer")
                    });
                    //
                    res.status(200).json({ message: "Welcome!", authToken });
                } catch (error) {
                    console.error("Error creating/authenticating token:", error);
                    res.status(500).json({ message: "Error authenticating user." });
                }
            } else {
                res.status(401).json({ message: "Incorrect password." });
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json({ message: "Error finding user." });
        });
};

const logOutUser = (req, res, next) => {
    res.clearCookie("token")

    res.status(200).json({ message: "adioooooosssssss" });
};

module.exports = { logOutUser };


const verifyUser = (req, res, next) => {

    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signUpUser,
    logInUser,
    verifyUser,
    logOutUser

}