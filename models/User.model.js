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

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" },
  )
  return authToken
}
userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}


const User = model("User", userSchema);

module.exports = User;
