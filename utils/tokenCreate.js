const jwt = require('jsonwebtoken')

userSchema.methods.signToken = function () {
    const { _id, username } = this
    const payload = { _id, username }
    const expiresIn = 60 * 15
    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn },
    )
    return authToken
}