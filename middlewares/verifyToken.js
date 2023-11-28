var { expressjwt } = require("express-jwt");

const verifyToken = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
})

function getTokenFromHeaders(req) {
    //cambiamos la cabecera y autorizacion por las cookies,
    //que ahora es mas segura 

    let token = req.headers.authorization
    //let token = req.cookie.authToken

    if (!token) throw new error("no exixste token")
    if (token && token.split(" ")[0] === "Bearer") {
        token = token.split(" ")[1]
        return token
    }


    return null
}

module.exports = { verifyToken }


//otra forma de gestionar este middelware es con try y catch 
//y sin usar el require
// export const requiereToken = (req, res, next) => {
//     try {

//         const token = req.headers?.authorization;
//         if (!token) throw new error("no exixste token")

//      token = token.split(" ")[1]
//     const payload = jwt.verify(token, process.env.TOKEN_SECRET,)
//         next()
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ error: error.message })
//     }

// }

