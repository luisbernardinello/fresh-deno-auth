import {

    Database,
    MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import { MONGODB_CONNECTION_STRING } from "./envConfig.ts";

let db:Database;

async function createMongoDBConnection() {
    try {
        const client = new MongoClient();
        await client.connect(MONGODB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
        return client.database("auth");
    } catch(error) {
        console.error(error);
    }

}

db = await createMongoDBConnection();

export {db, createMongoDBConnection}