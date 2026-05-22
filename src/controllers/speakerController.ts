import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await prisma.speaker.findMany({
      orderBy: { id: "asc" },
    });
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil speaker", error });
  }
};

export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const { name, role, image } = req.body;

    if (!name || !role || !image) {
      return res
        .status(400)
        .json({ message: "Nama, peran, dan gambar speaker wajib diisi" });
    }

    const newSpeaker = await prisma.speaker.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        image: image.trim(),
      },
    });

    res.status(201).json(newSpeaker);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat speaker", error });
  }
};

export const getSpeakerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const speaker = await prisma.speaker.findUnique({
      where: { id },
    });

    if (!speaker) {
      return res.status(404).json({ message: "Speaker tidak ditemukan" });
    }

    res.json(speaker);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil speaker", error });
  }
};

export const updateSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, role, image } = req.body;

    if (!name || !role || !image) {
      return res
        .status(400)
        .json({ message: "Nama, peran, dan gambar speaker wajib diisi" });
    }

    const updatedSpeaker = await prisma.speaker.update({
      where: { id },
      data: {
        name: name.trim(),
        role: role.trim(),
        image: image.trim(),
      },
    });

    res.json(updatedSpeaker);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate speaker", error });
  }
};

export const deleteSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.speaker.delete({ where: { id } });
    res.json({ message: "Speaker berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus speaker", error });
  }
};
