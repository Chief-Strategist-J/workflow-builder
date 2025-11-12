// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./mongodb";
import mongoose from 'mongoose';

// Initialize the database connection
const initializeAuth = async () => {
  // Ensure we're connected to the database
  const connection = await connectDB();
  
  // Get the native MongoDB driver instance from Mongoose
  const db = connection.connection.db;
  
  return betterAuth({
    database: mongodbAdapter(db)
  });
};

// Initialize and export the auth instanceexport const auth = initializeAuth();