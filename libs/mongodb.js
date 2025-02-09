import mongoose, { mongo } from "mongoose";
const MONG_URI = process.env.MONG_URI

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONG_URI);
        console.log("connected the database");
    } catch (error) {
        console.log("error is here " + error );
    }
}

export default connectMongoDB;