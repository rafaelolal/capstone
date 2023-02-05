import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.assignment.findMany();

    if (result) {
      res.status(200).json({
        data: result,
        message: "All assignments founds successfully",
      });
    } else {
      res.status(200).json({
        message: "No assignments found",
      });
    }
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ message: message });
  }
}
