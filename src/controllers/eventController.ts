import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

//1. menampilkan data
export const getEvents = async (req: Request, res: Response) => {
  try {
    //jika berhasil, select * from events
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    //menampilkan ke user
    res.json(events);
  } catch (error) {
    //jika error
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

//2. menyimpan data
export const createEvent = async (req: Request, res: Response) => {
  try {
    //jika berhasil
    const { name, categoryId, location, dateEvent, description } = req.body;

    //tambahkan validasi

    //simpan data
    const newEvent = await prisma.event.create({
      data: {
        name,
        categoryId,
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    //kasih tau ke user
    res.status(201).json({
      message: "Data event berhasil disimpan",
      data: newEvent,
    });
  } catch (error) {
    //jika ada error
    res.status(500).json({ message: "Gagal membuat event", error });
  }
};

//3. menampilkan data berdasarkan id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data event", error });
  }
};

//4. mengupdate data berdasarkan id
export const UpdateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, categoryId, location, dateEvent, description } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        categoryId,
        location,
        dateEvent: dateEvent ? new Date(dateEvent) : undefined,
        description,
      },
    });

    res.json({ message: "Data event berhasil diupdate", data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate event", error });
  }
};

//5. menghapus data berdasarkan id
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus event", error });
  }
};
