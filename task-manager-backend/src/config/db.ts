import mongoose from "mongoose";
const connectDb = async() => {
    if(process.env.DB_CONNECTION) {
        await mongoose.connect(process.env.DB_CONNECTION)
    } else {
        throw new Error("❌ DB_CONNECTION_SECRET is not defined in .env");
    }
};

export default connectDb