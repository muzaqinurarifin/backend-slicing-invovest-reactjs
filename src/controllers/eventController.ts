import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];

// menampilkan data event
export const getEvents = (req: Request, res: Response) => {
  res.json(events);
};

// menyimpan data event
export const createEvent = (req: Request, res: Response) => {
  const { name, category, tanggal, description } = req.body;

  // validasi jika name, category atau tanggal kosong
  if (!name || !category || !tanggal) {
    return res.status(500).json({
      message: "nama, Category atau tanggal harus diisi",
    });
  }

  // mapping datanya
  const newEvent: Event = {
    id: Date.now(),
    name: name,
    category: category,
    tanggal: tanggal,
    description: description,
  };

  // simpan data, minggu depan akan diganti ke sql
  events.push(newEvent);

  // jika berhasil disimpan
  res.status(201).json(newEvent);
};

// mengambil event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);

  // jika tidak ada
  if (!event) {
    return res.status(404).json({
      message: "Event tidak ditemukan",
    });
  }

  // jika ada
  res.json(event);
};

// mengupdate data event berdasarkan id
export const UpdateEvent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, category, tanggal, description } = req.body;
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event tidak ditemukan" });
  }

  events[index] = { ...events[index]!, name, category, tanggal, description };
  res.json(events[index]);
};

// menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event tidak ditemukan" });
  }

  events.splice(index, 1);
  res.json({ message: "Event berhasil dihapus" });
};
