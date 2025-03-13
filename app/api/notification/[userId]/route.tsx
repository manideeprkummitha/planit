import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || '';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();
    
    // Get database and collection
    const db = client.db(dbName);
    const notificationsCollection = db.collection('notifications');
    
    // Find all notifications for the specified user
    const notifications = await notificationsCollection
      .find({ userId: userId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .toArray();
      
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}