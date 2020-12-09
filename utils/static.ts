import { serveFile } from 'https://deno.land/std@0.80.0/http/file_server.ts';

const serveStatic = async (request: any, pub: string) => {
    const root = Deno.cwd();
    let path = `${root}/${pub}${request.url}`;
    const folder = `${root}/${pub}`;
    if(!request.url.includes('.')) {
        path = `${folder}/index.html`;
    }
    const content = await serveFile(request, path);
    request.respond(content);

}

export default serveStatic;
