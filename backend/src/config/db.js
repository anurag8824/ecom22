const mongoose = require("mongoose")

// const mongoDbUrl='mongodb+srv://ashutosh272006:yUxuzEUzpsOXhh98@cluster0.gsxvglf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoDbUrl = 'mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb=()=>{
    console.log("Connecting to database...")
    return mongoose.connect(mongoDbUrl)
   
}

module.exports={connectDb}