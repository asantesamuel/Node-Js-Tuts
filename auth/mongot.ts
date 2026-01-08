import mongoose from "mongoose";
import { Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}
const MONGODB_URI: string = process.env.MONGODB_URI; // In production, use process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then((): void => {
    console.log("Connected to MongoDB for Auth Service");
  })
  .catch((err: Error): void => {
    console.log(err);
  });

export interface IUser extends Document {
  username: string;
  Fname: string;
  Lname: string;
  email: string;
  password: string;
  token?: string;
  dob?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true } as const,
  Fname: { type: String, required: true } as const,
  Lname: { type: String, required: true } as const,
  email: { type: String, required: true } as const,
  password: { type: String, required: true } as const,
  token: { type: String },
  dob: { type: Date },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
