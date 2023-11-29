const Url = require('../models/Url.model')

const listUrl = (req, res, next) => {

    Url
        .find()
        .sort({ name: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const urlId = (req, res, next) => {

    const { url_id } = req.params

    Url
        .findById(url_id)
        .then(response => res.json(response))
        .catch(err => next(err))

}

const newUrl = (req, res, next) => {

    const { } = req.body

    Url
        .create({})
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const editUrl = (req, res, next) => {

    const { url_id } = req.params
    const { urlData } = req.body

    Url
        .findByIdAndUpdate(url_id, urlData)
        .then(() => res.sendStatus(201))
        .catch((err) => next(err))
}

const deleteUrl = (req, res, next) => {

    const { url_id } = req.params

    Url
        .findByIdAndDelete(url_id)
        .then(() => res.sendStatus(204))
        .catch((err) => next(err))
}

module.exports = {
    newUrl,
    urlId,
    listUrl,
    deleteUrl,
    editUrl
}