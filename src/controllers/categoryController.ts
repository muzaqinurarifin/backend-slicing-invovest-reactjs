import { Request, Response } from "express";
import { Category } from "../types/category.js";

let categories: Category[] = [];

// menampilkan data category
export const getCategory = (req: Request, res: Response) => {
  res.json(categories);
};

// menyimpan data category
export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  // validasi
  if (!name) {
    return res.status(500).json({
      message: "nama harus diisi",
    });
  }

  // mapping
  const newCategory: Category = {
    id: Date.now(),
    name: name,
  };

  // simpan data
  categories.push(newCategory);

  // jika berhasil disimpan
  res.status(201).json(newCategory);
};

// menampilkan data category by id
export const getCategoryById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = categories.find((category) => category.id === id);

  if (!category) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  res.json(category);
};

// mengupdate data category by id
export const updateCategory = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  categories[index] = { ...categories[index]!, name };
  res.json(categories[index]);
};

// menghapus data category by id
export const deleteCategory = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  categories.splice(index, 1);
  res.json({ message: "Kategori berhasil dihapus" });
};
