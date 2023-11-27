const { Schema, model } = require("mongoose");

const urlSchema = new Schema(
    {
    }
);

const Url = model("Url", urlSchema);

module.exports = Url;
