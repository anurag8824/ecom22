

import mongoose from "mongoose";

const connection = () =>{

mongoose.connect('mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

.then(()=>{
    console.log("Database sucessfully connected!")
    
})
.catch((err)=>{
    console.log("error in connecting DataBase",err)
})


}

// mongodb+srv://hr:3F0pNsvjlJhDGpXe@cluster0.uxqk6c8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export default connection
