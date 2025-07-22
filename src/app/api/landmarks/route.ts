import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Get the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/landmarks.json', 'utf8');

    // Parse the JSON
    const landmarks = JSON.parse(fileContents);

    // Return the landmarks data
    return NextResponse.json(landmarks);
  } catch (error) {
    console.error('Error reading landmarks data:', error);
    return NextResponse.json(
      { error: 'Failed to load landmarks data' },
      { status: 500 }
    );
  }
}
