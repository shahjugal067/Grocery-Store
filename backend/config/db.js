
import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(
            () => {
                console.log("Connected to DB")
            }
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};
export default connectDB