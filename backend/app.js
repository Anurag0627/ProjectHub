const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const apiRoutes = require("./src/routes/index");
const errorHandler = require("./src/middleware/error.middleware");

app.use(cors());
app.use(helmet());
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ProjectHub running..."
    });
});

app.use("/api/v1", apiRoutes);

app.use(errorHandler);

module.exports = app;