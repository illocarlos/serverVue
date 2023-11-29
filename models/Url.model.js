const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Url = model("Url", urlSchema);

module.exports = Url;
