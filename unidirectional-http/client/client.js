const client = new RpcClient(`${location.protocol}//${location.host}/api`);

window.onload = function () {
	document.getElementById("greet_button").onclick = async function () {
		greeting = await client.greet(document.getElementById("greet_name").value);
		elem = document.getElementById("greeting_text");
		elem.innerHTML = greeting;
	}
}