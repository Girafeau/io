import { serveFile } from 'https://deno.land/std@0.80.0/http/file_server.ts';
import {
    exists
} from "https://deno.land/std@0.80.0/fs/mod.ts";
const serveStatic = async (request: any, folder: string) => {
    const root = Deno.cwd();
    const path = `${root}/${folder}${request.url}`;
    console.log(path);
    const f = `${root}/${folder}`;
    if(request.method === 'GET') {
        if(request.url === '/') {
            const content = await serveFile(request, `${f}/index.html`);
            request.respond(content);
        } else {
            if(await exists(path)) {
                const content = await serveFile(request, `${path}`);
                request.respond(content);
            } else {
                const content = await serveFile(request, `${f}/index.html`);
                request.respond(content);
            }
        }

    }
}

export default serveStatic;
