window.onload = async function(){
	console.log("Client loaded");

	client = new RpcClient(`http://${location.host}/api`);
    var webSocketTransport = new JSONRPC.Plugins.Client.WebSocketTransport(
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

	greeting = await client.greet("Ani");
	elem = document.getElementById("greeting_text");
	elem.innerHTML = greeting;
}