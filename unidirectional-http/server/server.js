import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const http = require('http');
const JSONRPC = require('jsonrpc-bidirectional');

import { RpcServer } from "./rpc_server.js";

const app = express();
const httpServer = http.createServer(app);

const jsonrpcServer = new JSONRPC.Server();
jsonrpcServer.registerEndpoint(new RpcServer());
jsonrpcServer.attachToHTTPServer(httpServer, "/api");

app.use("/", express.static("client"));
app.use('/node_modules', express.static('../node_modules'));
app.post('/api', (request, response) => {
});

jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthenticationSkip());
jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthorizeAll());

const port = process.env.port;
httpServer.listen(port, () => console.log(`Listening on port ${port}!`));