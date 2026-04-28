import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let cachedConnection: Promise<MongoClient> | null = null;

export default async function connectToDatabase(): Promise<MongoClient> {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.getClient() as unknown as MongoClient;
    }

    if (cachedConnection) {
        return cachedConnection;
    }

    const options = {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 3000,
    };

    cachedConnection = mongoose
        .connect(process.env.DB_CONNECTION_STRING || "", options)
        .then((conn) => conn.connection.getClient() as unknown as MongoClient)
        .catch((err) => {
            // Limpar cache para permitir retry no proximo request.
            cachedConnection = null;
            throw err;
        });

    return cachedConnection;
}
