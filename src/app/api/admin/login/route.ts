import { NextResponse } from 'next/server';

// In a real application, these credentials would be stored in a database or environment variables
// You should change these values to your preferred admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "adminadmin69";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { username, password } = data;

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful"
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password"
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during admin authentication:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed"
      },
      { status: 500 }
    );
  }
}
