import { serveFile } from 'https://deno.land/std@0.80.0/http/file_server.ts';

const serveStatic = async (request: any, pub: string) => {
    const root = Deno.cwd();
    let path = `${root}/${pub}${request.url}`;
    const folder = `${root}/${pub}`;
    try {
        const read = await Deno.readFile(path);
        const content = await serveFile(request, path);
        request.respond(content);
    } catch(error) {
        path = `${folder}/index.html`;
        console.log(path);
        const content = await serveFile(request, path);
        request.respond(content);
    }
}

export default serveStatic;
