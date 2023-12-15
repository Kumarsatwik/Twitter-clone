import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, profileImage, coverImage } = req.body;
    console.log(name, username, bio, profileImage, coverImage);

    if (!name || !username) {
      return res
        .status(400)
        .json({ message: "Name and username are required" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
