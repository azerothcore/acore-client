# Wowser

Browser JavaScript and WebGL Game Client.

Licensed under the **MIT** license, see LICENSE for more information.

## Background

Wowser is a proof-of-concept of getting a triple-A game to run in a webbrowser,
attempting to tackle a wide variety of challenges: data retrieval, socket
connections, cryptography, 3d graphics, binary data handling, background workers
and audio, to name a few.

## Features

Wowser is aiming to be both a low-level API as well as a graphical client,
interacting with compatible game servers.

Wowser is compatible with all server based on Mangos 335 such as AzerothCore, TrinityCore
and Mangos itself. Of course other servers that use the same opcode specifications of projects above, are also supported .



At present, Wowser is capable of:

- Authenticating by username / password.
- Listing available realms.
- Connecting to a realm.
- Listing characters available on a realm.
- Joining the game world with a character.
- Chat in game on following channels: Guild, Say, Wispers, World (hardcoded custom channel)
- Logging game world packets, such as when a creature moves in the vicinity.

In addition, there's good progress on getting terrain and models rendered.

## Browser Support

Wowser is presumed to be working on any browser supporting [JavaScript's typed
arrays] and at the very least a binary version of the WebSocket protocol.

## Development

Wowser is written in [ES2015], developed with [webpack] and [Gulp], compiled by
[Babel] and [soon™] to be tested through [Mocha].

1. Clone the repository:

   ```shell
   git clone git://github.com/wowserhq/wowser.git
   ```

2. Download and install [Node.js] – including `npm` – for your platform.

3. Install dependencies:

   ```shell
   npm install
   ```

4. Install [StormLib] and [BLPConverter], which are used to handle Blizzard's
   game files.

### Client

Create a copy of /conf/conf.js.dist file and name it /conf/conf.js (don't delete the .dist file)
then configure it.

[Webpack]'s development server monitors source files and builds:

```shell
npm run web-dev
```

Wowser will be served on `http://localhost:8080`.

### Pipeline server

To deliver game resources to its client, Wowser ships with a pipeline.

Build the pipeline:

```shell
npm run gulp
```

Keep this process running to monitor source files and automatically rebuild.

After building, serve the pipeline as follows in a separate process:

```shell
npm run serve
```

On first run you will be prompted to specify the following:

- Path to client data folder
- Server port (default is `3000`)
- Number of cluster workers (default depends on amount of CPUs)

Clear these settings by running `npm run reset`

**Disclaimer:** Wowser serves up resources to the browser over HTTP. Depending
on your network configuration these may be available to others. Respect laws and
do not distribute game data you do not own.

### Socket proxies

To utilize raw TCP connections a WebSocket proxy is required for JavaScript
clients.

[Websockify] can - among other things - act as a proxy for raw TCP sockets.

For now, you will want to proxy both port 3724 (auth) and 8129 (world). Use a
different set of ports if the game server is on the same machine as your client.

```shell
npm run proxy 3724 host:3724
npm run proxy 8129 host:8129
```

## Contribution

When contributing, please:

- Fork the repository
- Open a pull request (preferably on a separate branch)

[Babel]: https://babeljs.io/
[ES2015]: https://babeljs.io/docs/learn-es2015/
[Gulp]: http://gulpjs.com/
[JavaScript's typed arrays]: http://caniuse.com/#search=typed%20arrays
[Mocha]: http://mochajs.org/
[Node.js]: http://nodejs.org/#download
[Websockify]: https://github.com/kanaka/websockify/
[soon™]: http://www.wowwiki.com/Soon
[webpack]: http://webpack.github.io/
