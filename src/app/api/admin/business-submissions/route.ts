import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the business submissions JSON file
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'business-submissions.json');

    // Check if the file exists
    let submissions = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      submissions = JSON.parse(fileContent);

      // Make sure it's an array
      if (!Array.isArray(submissions)) {
        submissions = [];
      }
    } catch (error) {
      // File doesn't exist or has invalid JSON, return empty array
      console.log('Business submissions file not found or invalid, returning empty array');
    }

    return NextResponse.json({
      success: true,
      submissions
    });
  } catch (error) {
    console.error('Error retrieving business submissions:', error);
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve business submissions: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    );
  }
}
