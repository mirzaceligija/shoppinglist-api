import express from "express";
import config from "config";
import log from "../config/logger";
import connect from "../config/DatabaseConfig";
import routes from "./api/v1/routes/index.routes";
import deserializeUser from "./api/v1/middlewares/deserializeUser";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);

    connect();

    routes(app);
});