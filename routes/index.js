
const router = require("express").Router()


const authRoutes = require('./auth.routes')
router.use("/auth", authRoutes);

const userRoutes = require('./user.routes')
router.use("/user", userRoutes);

const urlRoutes = require('./url.routes')
router.use("/url", urlRoutes);

module.exports = router