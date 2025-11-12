import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // This preserves the existing global.mongoose if it exists, or creates a new one
  // eslint-disable-next-line no-var
  var mongoose: CachedMongoose;
}

let cached = global.mongoose as CachedMongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'nextjsApp',
      bufferCommands: false,
    }).then((mongoose: typeof import('mongoose')) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
