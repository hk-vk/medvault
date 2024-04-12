import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Connected from previous");
    return global.mongoose.conn;
  }

  // Check if the MongoDB connection string is provided
  const conString = process.env.MONGO_URL;
  if (!conString) {
    console.error("MONGO_URL environment variable is not defined");
    throw new Error("MONGO_URL environment variable is not defined");
  }

  try {
    // Attempt to connect to MongoDB
    const promise = mongoose.connect(conString, {
      autoIndex: true,
    });

    // Log successful connection
    promise.then(() => {
      console.log("MongoDB connection established");
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Newly Connected");
    return await promise;
  } catch (error) {
    // Log and throw the error if the connection fails
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}