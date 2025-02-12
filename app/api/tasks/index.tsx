import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { Client, Databases, Query } from "node-appwrite";

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!) // Appwrite endpoint, e.g. "https://[HOSTNAME_OR_IP]/v1"
  .setProject(process.env.APPWRITE_PROJECT_ID!)  // Your project ID
  .setKey(process.env.APPWRITE_API_KEY!);         // Your API key (if needed)

// Initialize the Databases instance
const db = new Databases(client);

// Define your database and collection IDs (from environment variables or constants)
const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_TASK_COLLECTION_ID || "";

export async function GET(req: Request) {
  console.log("GET /api/tasks/user: Starting");

  let session;
  try {
    session = await getSession();
    console.log("GET /api/tasks/user: Session obtained:", session);
  } catch (err) {
    console.error("GET /api/tasks/user: Error fetching session:", err);
    return NextResponse.json({ error: "Session fetch error" }, { status: 500 });
  }

  if (!session) {
    console.error("GET /api/tasks/user: No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.sub;
  console.log("GET /api/tasks/user: userId:", userId);

  try {
    console.log("GET /api/tasks/user: Fetching tasks for userId:", userId);
    const response = await db.listDocuments(databaseId, collectionId, [
      Query.equal("owner_user_id", userId),
    ]);

    console.log("GET /api/tasks/user: Tasks fetched:", response.documents);
    return NextResponse.json(response.documents, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks/user: Error fetching tasks:", error);
    return NextResponse.json({ error: "Could not fetch tasks" }, { status: 500 });
  }
}
