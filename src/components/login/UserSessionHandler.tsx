import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/redux/userSlice';

const UserSessionHandler: React.FC = () => {
  const { data: session, status } = useSession();
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      dispatch(
        setUser({
          email: session.user.email || '',
          image: session.user.image || '',
          name: session.user.name || '',
        })
      );
    } else if (status === 'unauthenticated') {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  return null; // This component doesn't render anything, it just handles the session
};

export default UserSessionHandler;
