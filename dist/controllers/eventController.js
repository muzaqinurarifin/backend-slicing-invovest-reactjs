import { prisma } from "../lib/db.js";
//1. menampilkan data
export const getEvents = async (req, res) => {
    try {
        //jika berhasil, select * from events
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        //menampilkan ke user
        res.json(events);
    }
    catch (error) {
        //jika error
        res.status(500).json({
            message: "Gagal mengambil data",
            error,
        });
    }
};
//2. menyimpan data
export const createEvent = async (req, res) => {
    try {
        const { name, categoryId, location, dateEvent, description } = req.body;
        if (!name || !dateEvent || !categoryId) {
            return res
                .status(400)
                .json({ message: "Nama, kategori, dan tanggal event wajib diisi" });
        }
        const categoryIdNumber = Number(categoryId);
        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryIdNumber },
        });
        if (!categoryExists) {
            return res.status(400).json({ message: "Kategori tidak ditemukan" });
        }
        const newEvent = await prisma.event.create({
            data: {
                name: name.trim(),
                categoryId: String(categoryIdNumber),
                location: location ? location.trim() : "",
                dateEvent: new Date(dateEvent),
                description: description ? description.trim() : "",
            },
        });
        res.status(201).json({
            message: "Data event berhasil disimpan",
            data: newEvent,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal membuat event", error });
    }
};
//3. menampilkan data berdasarkan id
export const getEventById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengambil data event", error });
    }
};
//4. mengupdate data berdasarkan id
export const updateEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, categoryId, location, dateEvent, description } = req.body;
        const updateData = {
            name: name?.trim(),
            location: location?.trim(),
            description: description?.trim(),
        };
        if (categoryId) {
            const categoryIdNumber = Number(categoryId);
            const categoryExists = await prisma.category.findUnique({
                where: { id: categoryIdNumber },
            });
            if (!categoryExists) {
                return res.status(400).json({ message: "Kategori tidak ditemukan" });
            }
            updateData.categoryId = String(categoryIdNumber);
        }
        if (dateEvent) {
            updateData.dateEvent = new Date(dateEvent);
        }
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: updateData,
        });
        res.json({ message: "Data event berhasil diupdate", data: updatedEvent });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengupdate event", error });
    }
};
//5. menghapus data berdasarkan id
export const deleteEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.event.delete({ where: { id } });
        res.json({ message: "Event berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error });
    }
};
//# sourceMappingURL=eventController.js.map