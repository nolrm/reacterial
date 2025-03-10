import { NextApiRequest, NextApiResponse } from 'next';
import { User as UserModel } from '@/db/models';
import connectDB from '@/db/config/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.id) {
        console.error('User ID is undefined');
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email, role, address, phone } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, role, address, phone },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
