'use server';

import { Client, Account, Databases, Users } from "node-appwrite";
import {cookies} from "next/headers";

// we are creating a function to create a client session using appwrite
export async function createClientSession() {
    // we are creating a client session using appwrite
    const client = new Client();
    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    // we are now retrieving the session from the cookies
    const session = cookies().get("appwrite-session");

    // if the session is not found, we throw an error
    if(!session || !session.value){
        throw new Error("No session ");
    }

    // now we set the session in the client
    client.setSession(session.value);

    // return an object with a getter for the account service instance 
    return{
        get account(){
            return new Account(client);
        },
    };
}

// we are creating a function to create an admin client using Appwrite
export async function createAdminClient() {
    // Create a new instance of the appwrite client
    const client = new Client();
    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!);

    // Return an object with a getter for the users service instance
    return {
        get account(){
            return new Account(client);
        },
        get database(){
            return new Databases(client);
        },
        get user(){
            return new Users(client);
        }
    }
}