const client = new RpcClient(`${location.protocol}://${location.host}/api`);
const webSocketTransport = new JSONRPC.Plugins.Client.WebSocketTransport(
	/*ws*/ null, 
	/*bBidirectionalMode*/ false,
	{
		bAutoReconnect: true,
		strWebSocketURL: `ws://${location.host}/api`,
		
		// Optional WebSocket extra-initialization after the WebSocket becomes "open" (connected).
		fnWaitReadyOnConnected: async() => {
				// Optional to authenticate the connection.
			// await testClient.rpcX({method: "login", params: ["admin", "password"], skipWaitReadyOnConnect: true});
		}
	}
);
client.addPlugin(webSocketTransport);

window.onload = function() {
	document.getElementById("greet_button").onclick = async function() {
		greeting = await client.greet(document.getElementById("greet_name").value);
		elem = document.getElementById("greeting_text");
		elem.innerHTML = greeting;
	}
}