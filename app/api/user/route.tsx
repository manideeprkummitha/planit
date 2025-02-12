import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID, Query } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_USERS,
} = process.env;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, sub, phoneNumber } = body;

    console.log("Received data:", { name, email, sub, phoneNumber });

    if (!name || !email || !sub) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, sub)' },
        { status: 400 }
      );
    }

    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT as string)
      .setProject(APPWRITE_PROJECT_ID as string)
      .setKey(APPWRITE_API_KEY as string);

    const db = new Databases(client);

    // Ensure strict uniqueness: Check for existing user by auth0_id
    const existingDocs = await db.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_COLLECTION_USERS as string,
      [Query.equal('auth0_id', sub)]
    );

    console.log("Existing user check:", existingDocs.total);

    if (existingDocs.total > 0) {
      // ✅ User already exists, so no need to create again
      console.log("User already exists, skipping creation.");
      return NextResponse.json(
        { success: true, message: 'User already exists.', user: existingDocs.documents[0] },
        { status: 200 }
      );
    }

    // 🆕 User does not exist, create a new user
    const userDoc = await db.createDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_COLLECTION_USERS as string,
      ID.unique(),
      {
        user_name: name,
        user_email: email,
        auth0_id: sub,
        user_phone_number: phoneNumber,
      }
    );

    console.log("New user created:", userDoc);

    return NextResponse.json({ success: true, user: userDoc }, { status: 200 });

  } catch (error) {
    console.error('POST /api/user error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
