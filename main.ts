import { serve } from "https://deno.land/std@0.79.0/http/server.ts";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    WebSocket,
    acceptable
} from "https://deno.land/std@0.79.0/ws/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { Manager } from "./server/net/manager.ts";
import serveStatic from './server/utils/static.ts';

const port = +Deno.env.toObject().PORT || 3000;
const server = serve({ hostname: "0.0.0.0", port: port});
console.log(`Server running on ${port}.`);
const manager = new Manager();

const broadcast = (event: string, socket: WebSocket) => {
    const infos: string [] = event.split('@');
    const room: string = infos[0];
    const message: string = infos[1];
    let object = null;
    if (infos[2]) {
        object = JSON.parse(infos[2]);
    }
    manager.handle(room, message, object, socket);
}

const handleWebSocket = async (socket: WebSocket) => {
    try {
        for await (const event of socket) {
            if (typeof event === "string") {
                broadcast(event, socket);
            } else if (event instanceof Uint8Array) {

            } else if (isWebSocketPingEvent(event)) {
                const [, body] = event;

            } else if (isWebSocketCloseEvent(event)) {
                const { code, reason } = event;
                manager.disconnect(socket);
            }
        }
    } catch (err) {
        console.error(`failed to receive frame: ${err}`);
        if (!socket.isClosed) {
            await socket.close(1000).catch(console.error);
        }
    }
}

for await (const request of server) {
    if(acceptable(request)) {
        const { conn, headers, w:bufWriter , r:bufReader } = request;
        acceptWebSocket({ conn, headers, bufWriter, bufReader }).then(handleWebSocket).catch(async (err) => {
            console.error(`failed to accept websocket: ${err}`);
            await request.respond({ status: 400 });
        });
    } else {
        serveStatic(request, 'dist');
    }
}
