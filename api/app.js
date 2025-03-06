require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("./middlewares/cors.middleware");

/* DB init */
require("./config/db.config");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(logger("dev"));
app.use(cors);

/* API Routes Configuration */
const routes = require("./config/routes.config");
app.use("/api/v1/", routes);

const port = Number(process.env.PORT || 5000);

app.listen(port, () => console.info(`Application running at port ${port} 🚀`));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
