import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { db } from "../../../utils/DBConnection.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

interface Users {
    username: string;
    email: string;
    password: string;
}

const loginCollection = db.collection<Users>('users')

export const handler: Handlers = {
    async POST(req, ){
        try {
            const { username, email, password } = await req.json();
            const existingUser = await loginCollection.findOne({username: username});
            if(existingUser){
                return new Response(JSON.stringify({
                    status: STATUS_CODE.Forbidden,
                    statusText: "This username is already in use..."
                }));
            } else {
                const salt = await bcrypt.genSalt(8);
                const hashedPassword = await bcrypt.hash(password, salt)
                await loginCollection.insertOne({username, email, password: hashedPassword});
                return new Response(null, {
                    status: STATUS_CODE.Created,
                    statusText: "Registered sucessfully",
                });
            }
            
            
        } catch(error) {
            return new Response(error);
        }

    }
        
    
}