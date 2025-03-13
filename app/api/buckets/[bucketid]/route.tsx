// app/api/buckets/[bucketid]/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { Client, Databases } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_BUCKETS,
} = process.env;

// ✅ Helper function to fetch a bucket and verify ownership.
async function getBucketIfOwner(bucketId: string, auth0Id: string, db: Databases) {
  console.log(`🔍 Fetching bucket with ID: ${bucketId}`);

  try {
    const result = await db.getDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      bucketId
    );
    console.log('✅ Bucket fetched:', result);

    if (result.owner_user_id !== auth0Id) {
      console.log('⛔ Forbidden: User is not the owner');
      throw new Error('Forbidden');
    }
    return result;
  } catch (error) {
    console.error('❌ Error fetching bucket:', error);
    throw new Error('Bucket not found or forbidden');
  }
}

// ✅ Common function to initialize Appwrite Client
function initializeAppwrite() {
  console.log('🚀 Initializing Appwrite Client');
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(APPWRITE_API_KEY!);
  return new Databases(client);
}

// ✅ GET Request Handler
export async function GET(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  console.log('📥 GET request received');

  const session = await getSession(request);
  if (!session) {
    console.log('❌ Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;

  console.log(`👤 User: ${auth0Id}, 🪣 Bucket ID: ${bucketId}`);

  try {
    const db = initializeAppwrite();
    const bucket = await getBucketIfOwner(bucketId, auth0Id, db);
    return NextResponse.json(bucket, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching bucket:', error);
    return NextResponse.json({ error: 'Bucket not found or forbidden' }, { status: 404 });
  }
}

// ✅ PUT Request Handler (Fixing tag attribute issue)
export async function PUT(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  console.log('📥 PUT request received');

  const session = await getSession(request);
  if (!session) {
    console.log('❌ Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;
  console.log(`👤 User: ${auth0Id}, 🪣 Bucket ID: ${bucketId}`);

  try {
    const db = initializeAppwrite();
    await getBucketIfOwner(bucketId, auth0Id, db);

    const body = await request.json();
    console.log('📦 Request body:', body);

    // ❗ Remove system-generated fields before updating
    const allowedFields = { ...body };
    delete allowedFields.$id;
    delete allowedFields.$databaseId;
    delete allowedFields.$collectionId;
    delete allowedFields.$createdAt;
    delete allowedFields.$updatedAt;
    delete allowedFields.$permissions;

    // ✅ Ensure "tag" is always an array
    if (typeof allowedFields.tag === 'string') {
      allowedFields.tag = allowedFields.tag.split(',').map((tag: string) => tag.trim());
    }

    console.log('✅ Cleaned request body for update:', allowedFields);

    const updatedBucket = await db.updateDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      bucketId,
      allowedFields
    );

    console.log('✅ Bucket updated successfully:', updatedBucket);
    return NextResponse.json(updatedBucket, { status: 200 });
  } catch (error) {
    console.error('❌ Error updating bucket:', error);
    return NextResponse.json({ error: 'Forbidden or bucket not found' }, { status: 403 });
  }
}


// ✅ DELETE Request Handler
export async function DELETE(
  request: Request,
  { params }: { params: { bucketid: string } }
) {
  console.log('📥 DELETE request received');

  const session = await getSession(request);
  if (!session) {
    console.log('❌ Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth0Id = session.user.sub;
  const bucketId = params.bucketid;
  console.log(`👤 User: ${auth0Id}, 🪣 Bucket ID: ${bucketId}`);

  try {
    const db = initializeAppwrite();
    await getBucketIfOwner(bucketId, auth0Id, db);

    await db.deleteDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      bucketId
    );

    console.log('✅ Bucket deleted successfully');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting bucket:', error);
    return NextResponse.json({ error: 'Forbidden or bucket not found' }, { status: 403 });
  }
}
