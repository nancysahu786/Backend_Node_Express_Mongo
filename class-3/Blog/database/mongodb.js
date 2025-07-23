import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://nancy:786nancy687@cluster0.ra29nl1.mongodb.net/Blog_Database?retryWrites=true&w=majority&appName=Cluster0"
    );
    if (connection) {
      console.log(`Connected to database ${connection.host}`);
    }
  } catch (error) {
    console.log("Error in connecting database");
  }
};

export default connectToDB;
