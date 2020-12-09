import { serveFile } from 'https://deno.land/std@0.80.0/http/file_server.ts';

const serveStatic = async (request: any, pub: string) => {
    const root = Deno.cwd();
    const path = `${root}/${pub}${request.url}`;
    const folder = `${root}/${pub}`;
    let file = `${folder}/index.html`;
    try {
        const read = await Deno.readFile(path);
        const content = await serveFile(request, path);
        request.respond(content);
    } catch(error) {
        const content = await serveFile(request, file);
        request.respond(content);
    }
}

export default serveStatic;
