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
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, role, address, phone } = req.body; // Exclude email from updates
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, role, address, phone },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
