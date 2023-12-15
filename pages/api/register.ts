import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { email, username, name, password } = req.body;
    // console.log(email, username, name, password);
    if (!email || !username || !name || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma?.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
