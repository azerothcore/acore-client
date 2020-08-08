# WoW Chat, browser game client

WoW Chat, browser game client based on **WoWser**.

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


At present, this project is capable of:

- Authenticating by username / password.
- Listing available realms.
- Connecting to a realm.
- Listing characters available on a realm.
- Joining the game world with a character.
- Chat in game on following channels: Guild, Say, Wispers, World (hardcoded custom channel)
- Logging game world packets, such as when a creature moves in the vicinity.

## Browser Support

Wowser is presumed to be working on any browser supporting [JavaScript's typed
arrays] and at the very least a binary version of the WebSocket protocol.

## Development

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

### Run the client

Create a copy of **conf/conf.js.dist** file and name it **conf/conf.js** (don't delete the .dist file)
then configure it.

[Webpack]'s development server monitors source files and builds:

```shell
npm run web-dev
```

Wowser will be served on `http://127.0.0.1:8080/webpack-dev-server/`.

### Socket proxies

To utilize raw TCP connections a WebSocket proxy is required for JavaScript
clients.

[Websockify] can - among other things - act as a proxy for raw TCP sockets.

For now, you will want to proxy both port 3724 (auth) and 8085 (world). 

#### - Proxy port in localhost

If you want to connect this web client to a server in the same machine you can change the authserver port from 8085 to 8086 in the  **auth realmlist table** using:
```SQL
UPDATE `realmlist` SET `port`=8086 WHERE `id`=1;
```

Run proxy for localhost:
```shell
npm run proxy 3725 127.0.0.1:3724
npm run proxy 8086 127.0.0.1:8085
```

While login using the web client, use the port 3725.

#### - Proxy port for a public server

Run proxy for a public server:
```shell
npm run proxy 3724 server.realmlist:3724
npm run proxy 8085 server.realmlist:8085
```
replacing *server.realmlist* with the realmlist of the server.


## Contribution

When contributing, please:

- Fork the repository
- Open a pull request (preferably on a separate branch)

[Babel]: https://babeljs.io/
[BLPConverter]: https://github.com/wowserhq/blizzardry#blp
[ES2015]: https://babeljs.io/docs/learn-es2015/
[Gulp]: http://gulpjs.com/
[JavaScript's typed arrays]: http://caniuse.com/#search=typed%20arrays
[Mocha]: http://mochajs.org/
[Node.js]: http://nodejs.org/#download
[StormLib]: https://github.com/wowserhq/blizzardry#mpq
[Websockify]: https://github.com/kanaka/websockify/
[soon™]: http://www.wowwiki.com/Soon
[webpack]: http://webpack.github.io/
