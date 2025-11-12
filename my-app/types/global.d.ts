import mongoose, { Connection } from 'mongoose';

declare global {
  // This preserves the existing global.mongoose if it exists, or creates a new one
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {}; // This file needs to be a module
