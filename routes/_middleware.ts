import {getCookies} from "https://deno.land/std@0.205.0/http/cookie.ts";
import {decode} from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
    const cookieName = 'auth'
    const cookies = getCookies(req.headers);
    const token = cookies[cookieName]
    const url = new URL(req.url) // o pathname sera o path que o user visita
    if(token) {
        // verificar o token
        const verifyToken = await decode(token);
        if(verifyToken) {
            const nonProtectedRoutes = ['/login', '/register']
            if(nonProtectedRoutes.includes(url.pathname)) {
                url.pathname = '/'
                return Response.redirect(url);

            }
        }
    } else {
        const ProtectedRoutes = ['/'] // voce pode adicionar todas suas rotas protegidas aqui com APIs
        if(ProtectedRoutes.includes(url.pathname)) {
            url.pathname = '/login'
                return Response.redirect(url);
        }
    }





    return await ctx.next();
}