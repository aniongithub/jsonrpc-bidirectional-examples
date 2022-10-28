class RpcClient extends JSONRPC.Client
{
    async greet(name)
    {
        return this.rpc("greet", [...arguments]);
    }
}