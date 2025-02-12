// app/api/buckets/[bucketid]/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0'; // Ensure this works with your App Router
import { Client, Databases } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_BUCKETS,
} = process.env;

// Helper function to fetch a bucket and verify ownership.
async function getBucketIfOwner(bucketId: string, auth0Id: string, db: Databases) {
  const result = await db.getDocument(
    APPWRITE_DATABASE_ID!,
    APPWRITE_COLLECTION_BUCKETS!,
    bucketId
  );
  if (result.owner_user_id !== auth0Id) {
    throw new Error('Forbidden');
  }
  return result;
}

export async function GET(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  // Get session from request.
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(APPWRITE_API_KEY!);
  const db = new Databases(client);

  try {
    const bucket = await getBucketIfOwner(bucketId, auth0Id, db);
    return NextResponse.json(bucket, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bucket not found or forbidden' },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(APPWRITE_API_KEY!);
  const db = new Databases(client);

  try {
    // Ensure bucket belongs to the user.
    await getBucketIfOwner(bucketId, auth0Id, db);
    const body = await request.json();

    const updatedBucket = await db.updateDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      bucketId,
      { ...body }
    );
    return NextResponse.json(updatedBucket, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Forbidden or bucket not found' },
      { status: 403 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(APPWRITE_API_KEY!);
  const db = new Databases(client);

  try {
    await getBucketIfOwner(bucketId, auth0Id, db);
    await db.deleteDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      bucketId
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Forbidden or bucket not found' },
      { status: 403 }
    );
  }
}
