import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/database";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" }, 
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" }, 
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" }, 
        { status: 409 }
      );
    }

    // Create new user in database
    const newUser = createUser(name, email, password);

    // Return success response (don't include password)
    return NextResponse.json({ 
      message: "Registration successful",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      },
      token: `jwt-token-${newUser.id}`
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific database errors
    if (error instanceof Error && error.message === "User with this email already exists") {
      return NextResponse.json(
        { error: error.message }, 
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
}
