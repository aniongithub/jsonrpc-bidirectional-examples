import { createRequire } from "module";
const require = createRequire(import.meta.url);

const JSONRPC = require('jsonrpc-bidirectional');

export class RpcServer extends JSONRPC.EndpointBase
{
    constructor()
    {
        super(
			/*strName*/ "RpcServer", 
			/*strPath*/ "/api", 
			/*objReflection*/ {}, // Reserved for future use.
			/*classReverseCallsClient*/ JSONRPC.Client
        )
    }

    async greet(incomingRequest, name)
    {
        return `Hello, ${name}!`;
    }
}