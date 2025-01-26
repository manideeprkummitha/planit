import { Permission } from "node-appwrite";

// Reusable function for creating collection permissions
export const getDefaultPermissions = () => [
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
];
