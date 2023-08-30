const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

// Routes
const fetchImageRoutes = require("./routes/fetch-images");

app.use(express.json());
app.use(cors());
app.use(fetchImageRoutes);

try {
    app.listen(PORT, () => console.log(`app is live at port ${PORT}`));
} catch (error) {
    console.log(`failed to run app`);
    console.log(error);
}