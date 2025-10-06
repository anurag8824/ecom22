// const mongoose = require("mongoose")

// // const mongoDbUrl='mongodb+srv://ashutosh272006:yUxuzEUzpsOXhh98@cluster0.gsxvglf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const mongoDbUrl = 'mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const connectDb=()=>{
//     console.log("Connecting to database...")
//     return mongoose.connect(mongoDbUrl)
   
// }

// module.exports={connectDb}


// src/config/db.js
const mongoose = require("mongoose");

const mongoDbUrl = process.env.MONGO_URI || 'mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

let isConnected = false; // connection state

const connectDb = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    console.log("Connecting to MongoDB");
    const db = await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = { connectDb };
