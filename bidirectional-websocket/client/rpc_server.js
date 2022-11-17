function RpcServer()
{
	JSONRPC.EndpointBase.prototype.constructor.apply(
		this,
		[
			/*strName*/ "RpcServer", 
			/*strPath*/ `${location.protocol}//${location.host}/api`,
			/*objReflection*/ {},
			/*classReverseCallsClient*/ JSONRPC.Client
		]
	);
}

RpcServer.prototype = new JSONRPC.EndpointBase("RpcServer", "/api", {});
RpcServer.prototype.constructor = JSONRPC.EndpointBase;

RpcServer.prototype.greet = function(incomingRequest, name) {
	return new Promise(function(fnResolve, fnReject){
		fnResolve(name);
	});
};

RpcServer.prototype.alert_greet = function(incomingRequest, greeting) {
	alert(greeting);
}