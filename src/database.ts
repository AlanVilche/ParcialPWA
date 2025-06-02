import mongoose from "mongoose";

const connectDB = async () => {
    try {
         //await mongoose.connect(process.env.MONGO_URI, "mongodb+srv://alandb:<alanvilche2705>@alanvilche.hd4baqx.mongodb.net/?retryWrites=true&w=majority&appName=ALANVILCHE");
         await mongoose.connect('mongodb+srv://alandb:alanvilche2705@alanvilche.hd4baqx.mongodb.net/?retryWrites=true&w=majority&appName=ALANVILCHE');
        console.log('Database MongoDB connected 🟢')
    } catch (error) {
        console.error('MongoDB connection failed 🔴', error);
        process.exit(1);
    }
}

export default connectDB;