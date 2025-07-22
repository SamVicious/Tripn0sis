import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/database";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" }, 
        { status: 400 }
      );
    }

    // Authenticate user against database
    const user = authenticateUser(email, password);
    
    if (user) {
      return NextResponse.json({ 
        message: "Login successful", 
        user: { 
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        },
        token: `jwt-token-${user.id}` 
      });
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" }, 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
}
