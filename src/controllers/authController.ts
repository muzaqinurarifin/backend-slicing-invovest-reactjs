import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const name = req.body.name || req.body.nama;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm =
      req.body.password_confirm || req.body.passwordConfirm;

    // validasi untuk field yang wajib diisi
    if (!name || !email || !password || !passwordConfirm) {
      return res
        .status(400)
        .json({ message: "Nama, email, dan password harus diisi" });
    }

    // validasi untuk panjang password
    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ message: "Password dan konfirmasi password tidak cocok" });
    }

    // validasi untuk existing user, cek apakah email sudah ada atau belum
    const existingUser = await prisma.users.findUnique({
      where: { email: email.trim() },
    });

    // jika email sudah terdaftar, maka tidak bisa register lagi dengan email yang sama
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // hashed password menggunakan bcrypt
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

    // jika register berhasil, maka kembalikan data user yang baru dibuat (tanpa password)
    return res
      .status(201)
      .json({ message: "Register berhasil", user: newUser });

    // handle error yang terjadi selama proses register
  } catch (error) {
    return res.status(500).json({ message: "Gagal membuat user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validasi untuk field yang wajib diisi
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    // validasi untuk existing user, cek apakah email sudah ada atau belum
    const existingUser = await prisma.users.findUnique({
      where: { email: email.trim() },
    });

    // jika email tidak ditemukan, maka tidak bisa login
    if (!existingUser) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    // validasi untuk password, cek apakah password yang dimasukkan cocok dengan password yang tersimpan di database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // jika login berhasil, maka kembalikan data user yang berhasil login (tanpa password)
    return res.json({
      message: "login berhasil",
      token: token,
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      createdAt: existingUser.createdAt,
    });

    // handle error yang terjadi selama proses login
  } catch (error) {
    return res.status(500).json({ message: "Gagal login", error });
  }
};
