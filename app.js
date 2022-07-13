import express, { json, urlencoded } from "express";

const app = express();
import { config } from "dotenv";
config({ path: "./.env" });
import "./utils/db_connection.js";
const PORT = process.env.PORT;
import cors from "cors";
import {swaggerUi } from "./utils/swagger.js";
import { corsFunction } from "./utils/cors.js";
import production from "./utils/production.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJson = require("./swagger.json");

//routes
import coupleRoutes from "./routes/couples.routes.js";

app.use(cors());
app.use(corsFunction);
production(app)
app.use(json({
  limit: '5000mb'
}));
app.use(urlencoded({extended: true}));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(coupleRoutes);


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
