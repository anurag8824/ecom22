const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(
    'mongodb+srv://developmentinfayou_db_user:DLpYMWLmn2EaWhse@cluster0.ztvpgrd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log("Database successfully connected!");
  })
  .catch((err) => {
    console.log("Error in connecting database", err);
  });
}

// mongodb+srv://hr:3F0pNsvjlJhDGpXe@cluster0.uxqk6c8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

module.exports = connection;
