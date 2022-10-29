class RpcClient
{
    constructor(bidi_client)
    {
        this.bidi_client = bidi_client;
    }

    async greet(name)
    {
        return this.bidi_client.rpc("greet", [...arguments]);
    }
}