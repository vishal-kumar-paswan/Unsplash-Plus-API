const axios = require("axios");
const { response, json } = require("express");

exports.fetchImages = async (req, res) => {
    try {
        let imagesData = [];

        const apiEndPoints = [
            "/photos/?page=1&per_page=30",
            "/photos/?page=2&per_page=30",
            "/photos/?page=3&per_page=30",
            "/photos/?page=4&per_page=30",
            "/photos/?page=5&per_page=30",
            "/photos/?page=6&per_page=30",
            "/photos/?page=7&per_page=30",
            "/photos/?page=8&per_page=30",
            "/photos/?page=9&per_page=30",
            "/photos/?page=10&per_page=30",
            "/photos/?page=11&per_page=30",
            "/photos/?page=12&per_page=30",
            "/photos/?page=13&per_page=30",
            "/photos/?page=14&per_page=30",
            "/photos/?page=15&per_page=30",
            "/photos/?page=16&per_page=30",
            "/photos/?page=17&per_page=30",
            "/photos/?page=18&per_page=30",
            "/photos/?page=19&per_page=30",
            "/photos/?page=20&per_page=30",
            // "/photos/?page=21&per_page=30",
            // "/photos/?page=22&per_page=30",
            // "/photos/?page=23&per_page=30",
            // "/photos/?page=24&per_page=30",
            // "/photos/?page=25&per_page=30",
            // "/photos/?page=26&per_page=30",
            // "/photos/?page=27&per_page=30",
            // "/photos/?page=28&per_page=30",
            // "/photos/?page=29&per_page=30",
            // "/photos/?page=30&per_page=30",
            // "/photos/?page=31&per_page=30",
            // "/photos/?page=32&per_page=30",
            // "/photos/?page=33&per_page=30",
            // "/photos/?page=34&per_page=30",
            // "/photos/?page=35&per_page=30",
        ];

        const promises = apiEndPoints.map(async apiEndPoint => {
            const response = await axios.request({
                method: "GET",
                url: process.env.BASE_URL + apiEndPoint,
                headers: {
                    Authorization: `Client-ID ${process.env.CLIENT_ID}`
                }
            });

            imagesData = imagesData.concat(response.data);
        });

        Promise.all(promises).then(() => {
            const images = imagesData.map((data) => {
                let tempImageObject = {
                    id: data.id,
                    description: data.description,
                    thumb: data.urls.thumb,
                    raw: data.urls.raw,
                }
                return tempImageObject;
            })

            return res.status(200).send(images);
        }).catch((err) => {
            return res.status(400), json({ err });
        });

    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.fetchImageById = async (req, res) => {
    try {

        const imageId = req.params.imageId;

        const imageData = await axios.request({
            method: "GET",
            url: `${process.env.BASE_URL}/photos/${imageId}`,
            headers: {
                Authorization: `Client-ID ${process.env.CLIENT_ID}`
            }
        });

        const response = {
            id: imageData.data.id,
            description: imageData.data.description,
            raw: imageData.data.urls.raw,
            full: imageData.data.urls.full,
            regular: imageData.data.urls.regular,
            small: imageData.data.urls.small,
            thumb: imageData.data.urls.thumb,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error });
    }
}