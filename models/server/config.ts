import env from "@/app/env";
import {Avatars, Client, Databases, Storage} from "node-appwrite";

const client = new Client();

client
        .setEndpoint(env.appwrite.endpoint) // API Endpoint
        .setProject(env.appwrite.projectId) // Project ID
        .setKey(env.appwrite.apiKey) // sSecret API Key
;

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {client, databases, avatars, storage};