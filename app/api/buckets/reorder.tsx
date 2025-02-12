// pages/api/buckets/reorder.ts
import { getSession } from '@auth0/nextjs-auth0';
import { Client, Databases } from 'node-appwrite';

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_BUCKETS,
} = process.env;

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setKey(APPWRITE_API_KEY!);

  const db = new Databases(client);

  if (req.method === 'POST') {
    const { buckets } = req.body;

    try {
      const updates = buckets.map((b: any) =>
        db.updateDocument(APPWRITE_DATABASE_ID!, APPWRITE_COLLECTION_BUCKETS!, b.bucketId, {
          priority_level: b.priority_level,
        })
      );

      await Promise.all(updates);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error reordering buckets:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
