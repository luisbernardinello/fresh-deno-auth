import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.205.0/http/cookie.ts";
import { db } from "../../../utils/DBConnection.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import {create} from "https://deno.land/x/djwt@v2.9.1/mod.ts"

interface Users {
    _id?: any
    username: string;
    email: string;
    password: string;
}

const loginCollection = db.collection<Users>('users')

async function generateJwtToken(user:Users) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 30 * 24 * 60 * 60; //30 days
    const payload = {
        id: user._id,
        username: user.username,
        iat,
        exp,
    };
    const key = await crypto.subtle.generateKey(
        { name: "HMAC", hash: "SHA-512"},
        true,
        ["sign", "verify"],
    );
    const jwt = await create({alg: "HS512", typ: "JWT"}, {payload}, key);
    return jwt;
}

export const handler: Handlers={
    async POST(req, ) {
        try {
            const {email, password} = await req.json();
            const findUser = await loginCollection.findOne({ email: email});
            if(!findUser) {
                return new Response(JSON.stringify({error: "Invalid username or password..."}), {status:STATUS_CODE.NotFound,});
            }
            const isValidPassword = await bcrypt.compareSync(password, findUser.password)
            if(!isValidPassword) {
                return new Response(JSON.stringify({error: "Invalid username or password..."}), {status:STATUS_CODE.Unauthorized,});

            }
            const token = await generateJwtToken(findUser);
            const headers = new Headers();
            const url = new URL(req.url);
            setCookie(headers, {
                name: 'auth',
                value: token,
                maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true,
                httpOnly: true,
            })
            headers.set("Location", "/");
            headers.set('Content-Type', 'application/json');
            return new Response (
                JSON.stringify({
                    message: "Login sucessfully",
                    token: token,
                }),
                {
                    status: STATUS_CODE.OK,
                    headers: headers,
                }
            );
        } catch (error) {
            return new Response(error);
        }

    },
};