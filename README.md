# Bidirectional JSON-RPC examples

This repo contains examples to show usage of the excellent [jsonrpc-bidirectional](https://github.com/bigstepinc/jsonrpc-bidirectional) js library originally authored by @oxygen.

## Running

### Local (devcontainer)

To run these examples, you will need to set up the correct infrastructure to [run devcontainers](https://code.visualstudio.com/docs/devcontainers/containers#_installation) for your platform. Once opened inside the devcontainer, use the `unidirectional-http`, `unidirectional-websocket` or the `bidirectional-websocket` composite launch configs to launch the server and client directly from VS Code. This will allow you to place breakpoints for server/client directly in VS Code without needing the debug window in the browser.

### CodeSpaces (Github)

You can also open this repo within a Github CodeSpace, which will give you a full VS Code instance within your browser. You can use the "*Open in browser*" button in the popup or the "PORTS" toolwindow to open forwarded ports from the instance directly on your local machine.

Note: Use the `*-server` launch configurations to launch only the server when running on CodeSpaces as the client side browser cannot be started in this manner.
