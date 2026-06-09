import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// fungsi untuk register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // validasi input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nama, email, dan password harus diisi" });
  }

  // simpan data ke user
  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });

  return res.status(201).json(newUser);
};

// fungsi untuk login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }
};
