const express = require("express");
const router = express.Router();
const { fetchImages, fetchImageById } = require("../controllers/fetch-images");

router.get("/images", fetchImages);

router.get("/image/:imageId", fetchImageById);

module.exports = router;