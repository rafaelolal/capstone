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
        status: 200,
        title: "Found",
        message: "All assignments founds successfully",
      });
    } else {
      res.status(200).json({
        status: 404,
        title: "Not Found",
        message: "No assignments found",
      });
    }
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ status: 500, title: "Error", message: message });
  }
}
