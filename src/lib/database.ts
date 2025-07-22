import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read users from JSON file
function readUsers(): User[] {
  ensureDataDirectory();
  
  if (!fs.existsSync(DB_PATH)) {
    // Create initial database with demo user
    const initialUsers: User[] = [
      {
        id: '1',
        name: 'Demo User',
        email: 'user@example.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(DB_PATH, JSON.stringify(initialUsers, null, 2));
    return initialUsers;
  }

  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users database:', error);
    return [];
  }
}

// Write users to JSON file
function writeUsers(users: User[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users database:', error);
    throw new Error('Failed to save user data');
  }
}

// Find user by email
export function findUserByEmail(email: string): User | null {
  const users = readUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Create new user
export function createUser(name: string, email: string, password: string): User {
  const users = readUsers();
  
  // Check if user already exists
  if (findUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  // Add to users array and save
  users.push(newUser);
  writeUsers(users);

  return newUser;
}

// Verify user password
export function verifyPassword(plainPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

// Get user by email and password (for login)
export function authenticateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (!user) {
    return null;
  }

  if (verifyPassword(password, user.password)) {
    return user;
  }

  return null;
}

// Get all users (for admin purposes - remove password)
export function getAllUsers(): Omit<User, 'password'>[] {
  const users = readUsers();
  return users.map(({ password, ...user }) => user);
}
