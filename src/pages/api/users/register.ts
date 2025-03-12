import { NextApiRequest, NextApiResponse } from 'next';
import { User as UserModel } from '@/db/models';
import connectDB from '@/db/config/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { name, email, password, role, address, phone } = req.body;
      const newUser = await UserModel.create({
        name,
        email,
        password,
        role,
        address,
        phone,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
