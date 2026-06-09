import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil daftar user", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nama, email, dan password harus diisi",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password minimal 8 karakter" });
    }

    const emailAlreadyUsed = await prisma.users.findUnique({
      where: { email: email.trim() },
    });

    if (emailAlreadyUsed) {
      return res.status(400).json({ message: "Email sudah digunakan" });
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

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat user", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID user tidak valid" });
    }

    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID user tidak valid" });
    }

    const updateData: { name?: string; email?: string; password?: string } = {};

    if (name) {
      updateData.name = name.trim();
    }

    if (email) {
      const existingUser = await prisma.users.findUnique({
        where: { email: email.trim() },
      });

      if (existingUser && existingUser.id !== id) {
        return res
          .status(400)
          .json({ message: "Email sudah digunakan oleh user lain" });
      }

      updateData.email = email.trim();
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: "Password minimal 8 karakter" });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Tidak ada data yang diperbarui" });
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID user tidak valid" });
    }

    await prisma.users.delete({ where: { id } });
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus user", error });
  }
};
