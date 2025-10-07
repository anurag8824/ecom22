const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database successfully connected!!");
  } catch (err) {
    console.log("Error in connecting database", err);
  }
};

module.exports = connection;
