import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id);

  try {
    const result = await prisma.unit.findFirst({
      where: {
        id: id,
      },
    });

    if (result) {
      res.status(200).json({
        found: true,
        status: 200,
        title: "Signed In",
        message: "Unit found successfully",
      });
    } else {
      res
        .status(200)
        .json({
          found: false,
          status: 404,
          title: "Invalid ID",
          message: "Unit not found",
        });
    }
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ status: 500, title: "Error", message: message });
  }
}
