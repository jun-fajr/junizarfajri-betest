// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use environment variable for the MongoDB URI connection string
    await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection
    console.log("MongoDB connected");
  } catch (error) {
    // Catch and log connection errors
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the application if connection fails
  }
};

module.exports = connectDB;
