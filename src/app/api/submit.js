import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI;

// Define the schema for the submissions
const submissionSchema = new mongoose.Schema({
  companyName: String,
  botName: String,
  postgresUrl: String,
  trainingData: String, // Assuming you have trainingData field
  selectedFeatures: [String],
  selectedAdvancedFeatures: [String],
  apiKey: String,
  totalCost: Number
});

// Create a Mongoose model
const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

// Connect to MongoDB
const connectToMongo = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate the data (optional but recommended)
    if (!body.companyName || !body.botName || !body.postgresUrl || !body.trainingData || !body.selectedFeatures) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToMongo();

    // Create and save the new document
    const newSubmission = new Submission(body);
    const result = await newSubmission.save();

    return NextResponse.json({ message: 'Your details were stored successfully', id: result._id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to store data' }, { status: 500 });
  }
}
