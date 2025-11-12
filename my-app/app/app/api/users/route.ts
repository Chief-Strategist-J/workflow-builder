import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, email } = await req.json();
  const newUser = await User.create({ name, email });
  return NextResponse.json(newUser);
}
