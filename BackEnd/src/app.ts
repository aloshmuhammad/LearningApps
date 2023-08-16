import express, { Application, Request, Response } from "express";
import http, { createServer, IncomingMessage, ServerResponse } from "http";
import expressConfig from "./framework/webserver/express";
import serverConfig from "./framework/webserver/server";
import connection from "./framework/database/mongodb/connection";
import routes from "./framework/webserver/routes";
import cors from "cors";

const app: Application = express();
const server = http.createServer(app);
app.use(cors({ origin: "http://localhost:3000" }));
expressConfig(app);
//connect db
connection();

routes(app);

serverConfig(server).startServer();
