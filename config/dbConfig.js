const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URL;

exports.connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((result) => {
      console.log('Database Connected...')
    });  
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.log('Database disconnected!')
  })
};