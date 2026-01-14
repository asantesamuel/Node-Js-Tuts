import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import pool from "./pgdb";

(async () => {
  await pool.query("SELECT 1");
  console.log("PostgreSQL connected");
})();


import {
  findUserByUsername,
  createUser,
  getAllUsers,
} from "./user.model";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});


const JWT_SECRET = process.env.JWT_SECRET!;
//get users
app.get("/users", async (_req, res) => {
  const users = await getAllUsers();
  res.json(users);
});
//Signing up users
app.post("/signup", async (req: Request, res: Response) => {
  const { username, password, Fname, Lname, email, dob } = req.body;

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser(
    username,
    Fname,
    Lname,
    email,
    hashedPassword,
    dob
  );

  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt_token", token, { httpOnly: true, maxAge: 600000 });
  res.status(201).json({ message: "User registered successfully" });
});
//user login

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt_token", token, { httpOnly: true, maxAge: 600000 });
  res.json({ success: true, message: "Login successful" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
