// import { IndexType } from "node-appwrite";
import { db, tasksCollection } from "../name";
import { databases } from "./config";
import { getDefaultPermissions } from "./permissions";

export default async function createTasksCollection() {
    try {
        // 1. Create the Tasks collection
        await databases.createCollection(db, tasksCollection, tasksCollection, getDefaultPermissions());
        console.log("Tasks Collection Created");

        // 2. Create attributes asynchronously
        const attributePromises = [
            databases.createStringAttribute(db, tasksCollection, "task_name", 500, true), 
            databases.createStringAttribute(db, tasksCollection, "task_description", 1000, false),
            databases.createEnumAttribute(db, tasksCollection, "task_status", ["not_started", "in_progress", "completed", "on_hold", "cancelled"], true),
            databases.createEnumAttribute(db, tasksCollection, "task_priority", ["urgent", "high", "medium", "low", "none"], true),
            databases.createEnumAttribute(db, tasksCollection, "task_type", [
                "work",
                "personal",
                "health",
                "learning",
                "finance",
                "shopping",
                "errands",
                "events",
                "household",
                "social",
                "goals",
                "miscellaneous",
            ], true),
            databases.createDatetimeAttribute(db, tasksCollection, "task_time", false),
            databases.createStringAttribute(db, tasksCollection, "delegated_to", 200, false),
            databases.createBooleanAttribute(db, tasksCollection, "meeting", false),
            databases.createBooleanAttribute(db, tasksCollection, "notify", false),
            databases.createBooleanAttribute(db, tasksCollection, "recurring", false),
            databases.createStringAttribute(db, tasksCollection, "recurring_time", 250, false),
            databases.createStringAttribute(db, tasksCollection, "notes", 1000, false),
        ];

        // 3. Wait for all attribute creations
        await Promise.all(attributePromises);
        console.log("Tasks Collection Attributes Created");

        // // 4. Create indexes asynchronously
        // const indexPromises = [
        //     databases.createIndex(db, tasksCollection, "task_priority_index", IndexType.Key, ["task_priority"]),
        //     databases.createIndex(db, tasksCollection, "task_type_index", IndexType.Key, ["task_type"]),
        //     databases.createIndex(db, tasksCollection, "task_status_index", IndexType.Key, ["task_status"]),
        // ];

        // // 5. Wait for all index creations
        // await Promise.all(indexPromises);
        console.log("Tasks Collection Indexes Created");
    } catch (error) {
        console.error("Error creating Tasks Collection:", error);
    }
}
