import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { User as UserModel } from '@/db/models';
import connectDB from '@/db/config/database';
import bcrypt from 'bcryptjs';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // ✅ 1. Check authentication - only admins can create users
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'admin') {
      return res
        .status(401)
        .json({ error: 'Unauthorized. Admin access required.' });
    }

    // ✅ 2. Basic validation
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters' });
    }

    await connectDB();

    // ✅ 3. Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User with this email already exists' });
    }

    // ✅ 4. Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ 5. Create user with default 'user' role (never from request body)
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'user', // ✅ Always 'user' for new accounts
      address: address || '',
      phone: phone || '',
    });

    // ✅ 6. Return safe data (no password)
    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      image: newUser.image,
      address: newUser.address,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
    };

    res.status(201).json(safeUser);
  } catch (error: any) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
