import mongoose from "mongoose";
import { config } from "dotenv";
config();

function ConnectDb(): void {
  try {
    const connectKey = `${process.env.DB_CONNECT}`
    mongoose.set('strictQuery', false);
    mongoose.connect(connectKey);
  } catch (error) {
    console.warn(error, 'DataBase Connection Error!')
  }
}
export default ConnectDb;