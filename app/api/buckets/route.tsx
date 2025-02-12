// app/api/buckets/route.ts
import { getSession } from '@auth0/nextjs-auth0';
import { Client, Databases, ID, Query } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_BUCKETS,
} = process.env;

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!);

const db = new Databases(client);

// 🚀 GET Method to Fetch Buckets
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const auth0Id = session.user.sub;

    const response = await db.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      [Query.equal('owner_user_id', auth0Id)]
    );

    console.log('Fetched buckets:', response.documents);

    return new Response(JSON.stringify(response.documents), {
      status: 200,
    });
  } catch (error) {
    console.error('Error listing buckets:', error);
    return new Response(JSON.stringify({ error: 'Could not fetch buckets' }), {
      status: 500,
    });
  }
}

// 📝 POST Method to Create a New Bucket
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const auth0Id = session.user.sub;
    const body = await req.json();

    const {
      name,
      description,
      priority,
      priority_level,
      type,
      status,
      due_date,
      tag,
    } = body;

    console.log('Received data for creating the bucket:', body);

    const newBucket = await db.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_COLLECTION_BUCKETS!,
      ID.unique(),
      {
        owner_user_id: auth0Id,
        name: name || null,
        description: description || null,
        priority: priority || null,
        priority_level: priority_level || null,
        type: type || null,
        status: status || null,
        due_date: due_date || null,
        tag: Array.isArray(tag) ? tag : [tag],
      }
    );

    return new Response(JSON.stringify(newBucket), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating bucket:', error);
    return new Response(JSON.stringify({ error: 'Could not create bucket' }), {
      status: 500,
    });
  }
}
