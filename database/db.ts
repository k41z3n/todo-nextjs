import mongoose from 'mongoose';
import nodeTest from 'node:test';

/*
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('DB - connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('ussing previus connection');
    }
    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log('connectd to MongoDB', process.env.MONGO_URL);
};

export const disconnect = async () => {

  if (process.env.NODE_ENV === 'development') return

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();

  mongoConnection.isConnected = 0

  console.log('disconnected from MongoDB');
};
