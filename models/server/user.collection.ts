// import { IndexType } from "node-appwrite";
import { db, usersCollection } from "../name";
import { databases } from "./config";
import { getDefaultPermissions } from "./permissions";

export default async function createUsersCollection() {
    try {
        // 1. Create the Users collection
        await databases.createCollection(db, usersCollection, usersCollection, getDefaultPermissions());
        console.log("Users Collection Created");

        // 2. Create attributes asynchronously
        const attributePromises = [
            databases.createStringAttribute(db, usersCollection, "user_id", 200, true),   // Unique user ID
            databases.createStringAttribute(db, usersCollection, "user_name", 500, true), // User's name
            databases.createStringAttribute(db, usersCollection, "user_email", 400, true), // User's email
            databases.createStringAttribute(db, usersCollection, "strategy", 250, false),  // Optional strategy field
        ];

        // 3. Wait for all attribute creations
        await Promise.all(attributePromises);
        console.log("Users Collection Attributes Created");

        // // 4. Create indexes asynchronously
        // const indexPromises = [
        //     databases.createIndex(db, usersCollection, "user_email_index", IndexType.Unique, ["user_email"]),
        // ];

        // // 5. Wait for all index creations
        // await Promise.all(indexPromises);
        console.log("Users Collection Indexes Created");
    } catch (error) {
        console.error("Error creating Users Collection or Index:", error);
    }
}
