import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil kategori", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Nama kategori harus diisi" });
    }

    const newCategory = await prisma.category.create({
      data: { name: name.trim() },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat kategori", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil kategori", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Nama kategori harus diisi" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: name.trim() },
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate kategori", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kategori", error });
  }
};
