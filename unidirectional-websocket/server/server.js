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
app.use('/node_modules', express.static('../node_modules'));

const jsonrpcServer = new JSONRPC.Server();
jsonrpcServer.registerEndpoint(new RpcServer());

jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthenticationSkip());
jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthorizeAll());

const wsJSONRPCRouter = new JSONRPC.BidirectionalWebsocketRouter(jsonrpcServer);
const webSocketServer = new WebSocketServer({ noServer: true });
webSocketServer.on(
	"connection", 
	async(webSocket, upgradeRequest) => 
	{
		const nWebSocketConnectionID = wsJSONRPCRouter.addWebSocketSync(webSocket, upgradeRequest);
	}
);

const port = process.env.port;
const server = httpServer.listen(port, () => console.log(`Listening on port ${port}!`));
server.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, socket => {
        webSocketServer.emit('connection', socket, request);
    });
});