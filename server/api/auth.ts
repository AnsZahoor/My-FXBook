import { Request, Response } from "express";
import { authenticateUser } from "../../lib/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // In a real app, you would create a session or JWT token here
    res.status(200).json({ user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};