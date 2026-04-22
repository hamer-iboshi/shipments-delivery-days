import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err, req.baseUrl, req.method, req.path);
  if (err.message.startsWith("Invalid shipment data")) {
    return res.status(422).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
}