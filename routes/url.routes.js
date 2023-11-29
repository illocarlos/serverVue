const router = require("express").Router()


const {
    newUrl,
    urlId,
    listUrl,
    deleteUrl,
    editUrl
} = require('./../controllers/url.controller.js')


router.get("/list", listUrl)
router.get("/:url_id", urlId)
router.post("/create", newUrl)
//patch y put ser usan para lo mismno pero patch solo edita algo en concreto y put edita todo el objeto
router.patch("/update/:url_id", editUrl)
router.delete("/delete/:url_id", deleteUrl);

module.exports = router