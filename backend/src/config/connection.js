const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database successfully connected!!");
  } catch (err) {
    console.log("Error in connecting database", err);
  }
};

module.exports = connection;
