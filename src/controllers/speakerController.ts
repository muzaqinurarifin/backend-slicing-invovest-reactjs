import { Request, Response } from "express";
import { Speaker } from "../types/speaker";

let speakers: Speaker[] = [];

// menampilkan data speaker
export const getSpeakers = (req: Request, res: Response) => {
  res.json(speakers);
};

// menyimpan data speaker
export const createSpeaker = (req: Request, res: Response) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({ message: "Nama dan bio harus diisi" });
  }

  const newSpeaker: Speaker = {
    id: Date.now(),
    name: name,
    bio: bio,
  };

  speakers.push(newSpeaker);
  res.status(201).json(newSpeaker);
};

// menampilkan data speaker by id
export const getSpeakerById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const speaker = speakers.find((s) => s.id === id);

  if (!speaker) {
    return res.status(404).json({ message: "Speaker tidak ditemukan" });
  }

  res.json(speaker);
};

// mengupdate data speaker by id
export const UpdateSpeaker = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, bio } = req.body;
  const index = speakers.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Speaker tidak ditemukan" });
  }

  speakers[index] = { ...speakers[index]!, name, bio };
  res.json(speakers[index]);
};

// menghapus data speaker by id
export const DeleteSpeaker = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = speakers.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Speaker tidak ditemukan" });
  }

  speakers.splice(index, 1);
  res.json({ message: "Speaker berhasil dihapus" });
};
