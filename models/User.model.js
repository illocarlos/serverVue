const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, "usuario repetido."],
      lowercase: true,
      trim: true,
      //se usa para indexar bloques de usuario muy grandes
      //para buscar mas rapidamente
      index: { unique: true }
    },
    username: {
      type: String,
      required: [true, 'name is required.'],
      minlength: [3, 'Username must be 2 characters length'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],

    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {
  const user = this
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(user.password, salt)
  user.password = hashedPassword
  next()
})

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


// userSchema.methods.signToken = function () {
//   const { _id, username } = this
//   const payload = { _id, username }
//   const expiresIn = 60 * 15 * 300

//   const refreshAuthToken = jwt.sign(
//     payload,
//     process.env.TOKEN_REFRESH,
//     { algorithm: 'HS256', expiresIn },
//   )


//   //se usa para almacenar el token en la cookie 
//   res.cookie("refreshAuthToken", refreshAuthToken, {
//     httpOnly: true,
//     secure: !(process.env.MODO === "developer"),
//     expires: new Date(Date.now() + expiresIn * 1000)

//   });
//   //
//   return refreshAuthToken
// }


userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}


const User = model("User", userSchema);

module.exports = User;
