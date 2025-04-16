import express from "express";
import { login } from "./api/auth";

const app = express();
app.use(express.json());

// Auth route
app.post("/api/auth/login", login);

// ... other routes ...