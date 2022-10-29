var jsonrpcServer = new JSONRPC.Server();
jsonrpcServer.registerEndpoint(new RpcServer());

// By default, JSONRPC.Server rejects all requests as not authenticated and not authorized.
jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthenticationSkip());
jsonrpcServer.addPlugin(new JSONRPC.Plugins.Server.AuthorizeAll());

var client;
var ws = new WebSocket(`ws://${location.host}/api`);
ws.addEventListener("open", function(event){
	var wsJSONRPCRouter = new JSONRPC.BidirectionalWebsocketRouter(jsonrpcServer);
	var nWebSocketConnectionID = wsJSONRPCRouter.addWebSocketSync(ws);
	var bidi_client = wsJSONRPCRouter.connectionIDToSingletonClient(nWebSocketConnectionID, JSONRPC.Client);
	client = new RpcClient(bidi_client);	
});

window.onload = function() {
	document.getElementById("greet_button").onclick = async function() {
		greeting = await client.greet(document.getElementById("greet_name").value);
		elem = document.getElementById("greeting_text");
		elem.innerHTML = greeting;
	}
}