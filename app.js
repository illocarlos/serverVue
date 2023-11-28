require("dotenv").config();
require("./db");

const cookieParser = require("cookie-parser")
const express = require("express");
const app = express();

require("./config")(app);

app.use(express.json())
app.use(cookieParser())
app.use('/api', require("./routes"))

require("./error-handling")(app)


// esto se usa para hacer una demostracion desde el backend usando un html directo
// app.use(express.static("public/la carpeta que sea "))

module.exports = app;
