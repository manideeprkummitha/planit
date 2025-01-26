import { db } from "../name";
import createUsersCollection from "./user.collection";
import createBucketsCollection from "./buckets.collection";
import createBucketsTableCollection from "./buckettable.collection";
import createTasksCollection from "./tasks.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        // console.log("Database ID:", db);
        // console.log("Databases Instance:", databases);

        // Try to get the database
        await databases.get(db);
        // console.log("Database connection established");
    } catch (error) {
        try {
            // Create the database if it doesn't exist
            await databases.create(db, db); // Provide a meaningful name
            console.log("Database created");

            // Create collections
            await Promise.all([
                createUsersCollection(),
                createBucketsCollection(),
                createBucketsTableCollection(),
                createTasksCollection(),
            ]);

            console.log("All collections created successfully");
        } catch (innerError) {
            console.error("Error creating database or collections:", innerError);
        }
    }

    return databases;
}
