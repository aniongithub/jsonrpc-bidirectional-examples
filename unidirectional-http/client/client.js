
window.onload = async function(){
	console.log("Client loaded");

	client = new RpcClient(`http://${location.host}/api`);
	greeting = await client.greet("Ani");
	console.log(greeting);
}
