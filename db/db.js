import mongoose from "mongoose";


// MongoDB connection URL
const MONGO_URI = 'mongodb://127.0.0.1:27017/myDatabase';

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(conn.connection.host)

    } catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error)
        // process.exit(1);
    }
}

export default connectDB



