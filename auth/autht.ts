import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import User from "./mongot";
import { dot } from "node:test/reporters";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}
const JWT_SECRET: string = process.env.JWT_SECRET; // In production, use process.env.JWT_SECRET

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Auth API is running" });
});

//get users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    } else {
      res.status(500).json({ message: "Error fetching users" });
    }
  }
});

interface SignupBody {
  username: string;
  password: string;
  Fname: string;
  Lname: string;
  email: string;
  dob: Date;
}

// Register Route
app.post("/signup", async (req: Request<{}, {}, SignupBody>, res: Response) => {
  try {
    const { username, password, Fname, Lname, email, dob } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      Fname,
      Lname,
      email,
      password: hashedPassword,
      dob,
    });

    // Generate JWT Token using the newly created user's ID

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 600000, // 10 minutes
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    } else {
      res.status(500).json({ message: "Error registering user" });
    }
  }
});

interface LoginBody {
  username: string;
  password: string;
}

// Login Route

app.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
      //Generate JWT Token
      interface JwtPayload {
        id: string;
        username: string;
      }
      const payload:JwtPayload = { id: user._id.toString(), username: user.username };
      const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 1. Set the cookie (HttpOnly prevents JS access)
      res.cookie("jwt_token", token, {
        httpOnly: true,
        maxAge: 600000, // 10 minutes
      });
      res.json({
        success: true,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error:unknown) {
    if (error instanceof Error) {
    res.status(500).json({ message: "Server error", error: error.message });}
    else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

app.listen(8083, (): void => {
  console.log("Auth service running on port 8083");
});
