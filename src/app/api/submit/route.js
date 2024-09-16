// pages/api/submit.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate the data (optional but recommended)
    if (!body.companyName || !body.botName || !body.postgresUrl || !body.trainingData || !body.selectedFeatures) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('ai_model_selector');
    const collection = database.collection('submissions');
    
    const result = await collection.insertOne(body);

    return NextResponse.json({ message: 'Your Details stored successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to store data' }, { status: 500 });
  } finally {
    await client.close();
  }
}
