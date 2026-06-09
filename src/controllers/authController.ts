import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const register = async (req: Request, res: Response) => {
  try {
    const name = req.body.name || req.body.nama;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm =
      req.body.password_confirm || req.body.passwordConfirm;

    if (!name || !email || !password || !passwordConfirm) {
      return res
        .status(400)
        .json({ message: "Nama, email, dan password harus diisi" });
    }

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ message: "Password dan konfirmasi password tidak cocok" });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email: email.trim() },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Gagal membuat user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    const user = await prisma.users.findUnique({
      where: { email: email.trim() },
    });

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Gagal login", error });
  }
};
