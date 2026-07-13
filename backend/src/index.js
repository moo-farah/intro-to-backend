import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({      // used to load environment variables from a .env file into process.env
    path: './.env'
});

console.log("MONGODB_URI:", JSON.stringify(process.env.MONGODB_URI));

const startServer = async () => {
    try {
        await connectDB();
        
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
             console.log(`Server is running on port: ${process.env.PORT}`);
        });

    } catch (err) {
        console.log("MongoDB connection failed", err);
    }
}

startServer();
