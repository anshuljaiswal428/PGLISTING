import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully! ${conn.connection.host}`);
    } catch (error){
        console.log(`Failed Connection MongoDB ${error}`);
        process.exit(1);
    }
};

export default connectDB;