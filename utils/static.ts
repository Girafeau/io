import { serveFile } from 'https://deno.land/std@0.80.0/http/file_server.ts';

const serveStatic = async (request: any, folder: string) => {
    const root = Deno.cwd();
    let path = `${root}/${folder}`;
    if(request.method === 'GET') {
        try {
            request.respond(await serveFile(request, `${path}${request.url}`));
        } catch (e) {
            request.respond(await serveFile(request, `${path}/index.html`));
        }
    }
}

export default serveStatic;
