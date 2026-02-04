import mongoose from "mongoose";
import { configDotenv} from "dotenv";

export const db = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ Database Connected Successfully`)
    } catch (err) {
        console.error(`❌ Connection Failed :${err.mssage}`)
    }
}