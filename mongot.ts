import mongoose from "mongoose";
import { Document } from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string)
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
