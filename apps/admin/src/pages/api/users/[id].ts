import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { User as UserModel } from '@/db/models';
import connectDB from '@/db/config/database';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ✅ 1. Require authentication for all operations
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    await connectDB();

    const { id } = req.query;

    if (req.method === 'GET') {
      // ✅ 2. Authorization: Users can only view their own data (unless admin)
      if (session.user.id !== id && session.user.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Forbidden. You can only access your own data.' });
      }

      const user = await UserModel.findById(id).select('-password'); // ✅ Exclude password

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } else if (req.method === 'PUT') {
      // ✅ 3. Authorization: Users can only update their own data (unless admin)
      if (session.user.id !== id && session.user.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Forbidden. You can only update your own data.' });
      }

      const { name, role, address, phone } = req.body;

      const updateData: any = { name, address, phone };

      // ✅ 4. Only admins can change roles
      if (role !== undefined) {
        if (session.user.role !== 'admin') {
          return res
            .status(403)
            .json({ error: 'Forbidden. Only admins can change user roles.' });
        }
        updateData.role = role;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).select('-password'); // ✅ Exclude password

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } else if (req.method === 'DELETE') {
      // ✅ 5. Only admins can delete users
      if (session.user.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Forbidden. Only admins can delete users.' });
      }

      // ✅ 6. Prevent self-deletion
      if (session.user.id === id) {
        return res
          .status(400)
          .json({ error: 'You cannot delete your own account.' });
      }

      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error: any) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
