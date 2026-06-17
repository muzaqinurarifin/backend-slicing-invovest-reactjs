import { Request, Response, NextFunction } from "express"; // nextfunction untuk meneruskan ke middleware berikutnya
import jwt from "jsonwebtoken";

// middleware untuk memverifikasi token JWT yang dikirimkan oleh client
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  // cek apakah header authorization ada=
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1]; // token biasanya dikirimkan dengan format "Bearer <token>"

  // jika token tidak ditemukan
  if (!token) {
    return res.status(401).json({ message: "format token tidak valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
      next();
      
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Token tidak valid" });
  }
};
