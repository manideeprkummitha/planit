// import { IndexType } from "node-appwrite";
import { db, bucketsTableCollection } from "../name";
import { databases } from "./config";
import { getDefaultPermissions } from "./permissions";

export default async function createBucketsTableCollection() {
    try {
        // 1. Create the Bucket Tasks Table collection
        await databases.createCollection(db, bucketsTableCollection, bucketsTableCollection, getDefaultPermissions());
        console.log("Bucket Tasks Table Collection Created");

        // 2. Create attributes asynchronously
        const attributePromises = [
            databases.createStringAttribute(db, bucketsTableCollection, "bucket_id", 200, true),
            databases.createStringAttribute(db, bucketsTableCollection, "tasks_id", 400, false, undefined, true), // Array of task IDs
            databases.createStringAttribute(db, bucketsTableCollection, "task_count", 200, false),
        ];

        // 3. Wait for all attribute creations
        await Promise.all(attributePromises);
        console.log("Bucket Tasks Table Collection Attributes Created");

        // // 4. Create indexes asynchronously
        // const indexPromises = [
        //     databases.createIndex(db, bucketsTableCollection, "bucket_id_index", IndexType.Key, ["bucket_id"]),
        // ];

        // // 5. Wait for all index creations
        // await Promise.all(indexPromises);
        console.log("Bucket Tasks Table Collection Indexes Created");
    } catch (error) {
        console.error("Error creating Bucket Tasks Table Collection:", error);
    }
}
