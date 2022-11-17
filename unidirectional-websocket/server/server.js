import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const http = require('http');
const JSONRPC = require('jsonrpc-bidirectional');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

import { RpcServer } from "./rpc_server.js";

const app = express();
const httpServer = http.createServer(app);

app.use("/", express.static("client"));
app.use('/js/babel-polyfill', express.static('../node_modules//babel-polyfill/dist'));
app.use('/js/whatwg-fetch', express.static('../node_modules/whatwg-fetch'));
app.use('/js/es6-promise', express.static('../node_modules/es6-promise/dist'));
app.use('/js/jsonrpc-bidirectional', express.static('../node_modules/jsonrpc-bidirectional/builds/browser/es7'));

const jsonrpcServer = new JSONRPC.Server();
jsonrpcServer.registerEndpoint(new RpcServer());

jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthenticationSkip());
jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthorizeAll());

const wsJSONRPCRouter = new JSONRPC.BidirectionalWebsocketRouter(jsonrpcServer);
const webSocketServer = new WebSocketServer({ server: httpServer });
webSocketServer.on(
	"connection", 
	async(webSocket, upgradeRequest) => 
	{
		const nWebSocketConnectionID = wsJSONRPCRouter.addWebSocketSync(webSocket, upgradeRequest);
	}
);

const port = process.env.port;
httpServer.listen(port, () => console.log(`Listening on port ${port}!`));