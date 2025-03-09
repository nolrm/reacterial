import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser, setLoading } from '@/redux/userSlice';
import { AppDispatch } from '@/redux/store';

const UserSessionHandler: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'loading') {
      dispatch(setLoading(true));
    }

    if (status === 'authenticated' && session?.user) {
      dispatch(
        setUser({
          email: session.user.email || '',
          image: session.user.image || '',
          name: session.user.name || '',
          phone: session.user.phone || '',
          address: session.user.address || '',
        })
      );
    } else if (status === 'unauthenticated') {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  return null;
};

export default UserSessionHandler;
