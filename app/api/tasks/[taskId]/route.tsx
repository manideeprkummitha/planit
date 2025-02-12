import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"
import { Client, Databases } from "node-appwrite"

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_TASKS,
} = process.env

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT as string)
  .setProject(APPWRITE_PROJECT_ID as string)
  .setKey(APPWRITE_API_KEY as string)

const db = new Databases(client)
const databaseId = APPWRITE_DATABASE_ID as string
const collectionId = APPWRITE_COLLECTION_TASKS as string

/**
 * GET /api/tasks/[taskId]
 */
export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  // Optional Auth0 check (may need a custom approach in route handlers)
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // The taskId from the URL
  const { taskId } = params

  try {
    const task = await db.getDocument(databaseId, collectionId, taskId)
    return NextResponse.json(task, { status: 200 })
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Could not fetch task" }, { status: 500 })
  }
}

/**
 * PATCH /api/tasks/[taskId]
 */
export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  // Optional Auth0 check
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { taskId } = params

  try {
    const updates = await request.json()
    const updatedTask = await db.updateDocument(databaseId, collectionId, taskId, updates)
    return NextResponse.json(updatedTask, { status: 200 })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Could not update task" }, { status: 500 })
  }
}

/**
 * DELETE /api/tasks/[taskId]
 */
export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  // Optional Auth0 check
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { taskId } = params

  try {
    await db.deleteDocument(databaseId, collectionId, taskId)
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Could not delete task" }, { status: 500 })
  }
}
