// import { IndexType } from "node-appwrite";
import { db, bucketsCollection } from "../name";
import { databases } from "./config";
import { STATUSES, PRIORITY_LEVELS } from "@/utils/constants";
import { getDefaultPermissions } from "./permissions";

export default async function createBucketsCollection() {
    try {
        // 1. Create the Buckets collection
        await databases.createCollection(db, bucketsCollection, bucketsCollection, getDefaultPermissions());
        console.log("Buckets Collection Created");

        // 2. Create attributes asynchronously
        const attributePromises = [
            databases.createStringAttribute(db, bucketsCollection, "user_id", 200, true),
            databases.createStringAttribute(db, bucketsCollection, "bucket_name", 500, true),
            databases.createStringAttribute(db, bucketsCollection, "bucket_description", 1000, false),
            databases.createStringAttribute(db, bucketsCollection, "tag", 250, false),
            databases.createStringAttribute(db, bucketsCollection, "type", 250, false),
            databases.createEnumAttribute(db, bucketsCollection, "bucket_status", STATUSES.map((status) => status.value), true),
            databases.createEnumAttribute(db, bucketsCollection, "bucket_priority", PRIORITY_LEVELS.map((priority) => priority.value), false),
            databases.createDatetimeAttribute(db, bucketsCollection, "bucket_due_date", false),
            databases.createStringAttribute(db, bucketsCollection, "bucket_tags", 1000, false, undefined, true), // Array
        ];

        // 3. Wait for all attribute creations
        await Promise.all(attributePromises);
        console.log("Buckets Collection Attributes Created");

        // // 4. Create indexes asynchronously
        // const indexPromises = [
        //     databases.createIndex(db, bucketsCollection, "user_id_index", IndexType.Key, ["user_id"]),
        // ];

        // // 5. Wait for all index creations
        // await Promise.all(indexPromises);
        console.log("Buckets Collection Indexes Created");
    } catch (error) {
        console.error("Error creating Buckets Collection:", error);
    }
}
