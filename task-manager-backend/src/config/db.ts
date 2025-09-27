import mongoose from "mongoose";
import { ENV } from "./env";
const connectDb = async() => {
    if(ENV.MONGO_URI) {
        await mongoose.connect(ENV.MONGO_URI)
    } else {
        throw new Error("❌ DB_CONNECTION_SECRET is not defined in .env");
    }
};

export default connectDb