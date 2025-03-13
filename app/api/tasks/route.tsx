import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { Client, Databases, ID, Query } from "node-appwrite";

// Destructure environment variables
const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_TASKS,
} = process.env;

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT!) // e.g., "https://[HOSTNAME_OR_IP]/v1"
  .setProject(APPWRITE_PROJECT_ID!)  // Your project ID
  .setKey(APPWRITE_API_KEY!);         // Your API key (if needed)

// Initialize the Databases instance
const db = new Databases(client);
const databaseId = APPWRITE_DATABASE_ID as string;
const collectionId = APPWRITE_COLLECTION_TASKS as string;

/**
 * GET /api/tasks
 * - If a query parameter "bucket_id" is provided, fetch tasks for that specific bucket.
 * - Otherwise, fetch all tasks for the authenticated user.
 */
export async function GET(req: Request) {
  console.log("GET /api/tasks: Starting");

  // Retrieve the session to authenticate the request
  let session;
  try {
    session = await getSession();
    console.log("GET /api/tasks: Session obtained:", session);
  } catch (err) {
    console.error("GET /api/tasks: Error fetching session:", err);
    return NextResponse.json({ error: "Session fetch error" }, { status: 500 });
  }

  if (!session) {
    console.error("GET /api/tasks: No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.sub;
  console.log("GET /api/tasks: userId:", userId);

  // Parse query parameters to optionally filter by bucket_id
  const { searchParams } = new URL(req.url);
  const bucket_id = searchParams.get("bucket_id");

  // Always filter by the authenticated user's ID
  const queries = [Query.equal("owner_user_id", userId)];

  // If a bucket_id is provided, add it to the query filters
  if (bucket_id) {
    console.log("GET /api/tasks: bucket_id provided:", bucket_id);
    queries.push(Query.equal("bucket_id", bucket_id));
  } else {
    console.log("GET /api/tasks: No bucket_id provided, returning all tasks for the user");
  }

  try {
    console.log("GET /api/tasks: Fetching tasks with queries:", queries);
    const response = await db.listDocuments(databaseId, collectionId, queries);
    console.log("GET /api/tasks: Tasks fetched:", response.documents);
    return NextResponse.json(response.documents, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks: Error fetching tasks:", error);
    return NextResponse.json({ error: "Could not fetch tasks" }, { status: 500 });
  }
}

/**
 * POST /api/tasks - Creates a new task for the authenticated user in a specific bucket.
 */
export async function POST(req: Request) {
  console.log("POST /api/tasks: Starting");

  // Retrieve the session to authenticate the request
  let session;
  try {
    session = await getSession();
    console.log("POST /api/tasks: Session obtained:", session);
  } catch (err) {
    console.error("POST /api/tasks: Error fetching session:", err);
    return NextResponse.json({ error: "Session fetch error" }, { status: 500 });
  }

  if (!session) {
    console.error("POST /api/tasks: No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.sub;
  console.log("POST /api/tasks: userId:", userId);

  let body;
  try {
    body = await req.json();
    console.log("POST /api/tasks: Request body parsed:", body);
  } catch (err) {
    console.error("POST /api/tasks: Error parsing body:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Destructure the expected fields from the request body
  const {
    bucket_id,
    task_title,
    task_description,
    task_status,
    task_priority,
    task_due_date,
    task_delegated_to,
    task_meeting,
    task_notify,
    task_recurring,
    task_recurring_frequency,
    task_notes,
  } = body;

  // Validate that a bucket_id is provided
  if (!bucket_id) {
    console.error("POST /api/tasks: Missing bucket_id");
    return NextResponse.json({ error: "bucket_id is required" }, { status: 400 });
  }

  try {
    console.log("POST /api/tasks: Creating new task for bucket:", bucket_id);
    const newTask = await db.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        owner_user_id: userId,
        bucket_id,
        task_title,
        task_description,
        task_status,
        task_priority,
        task_due_date,
        task_delegated_to,
        task_meeting,
        task_notify,
        task_recurring,
        task_recurring_frequency,
        task_notes,
      }
    );
    console.log("POST /api/tasks: Task created:", newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks: Error creating task:", error);
    return NextResponse.json({ error: "Could not create task" }, { status: 500 });
  }
}
