import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'unauthenticated' && router.pathname !== '/signin') {
                router.push('/signin');
            }
        }, [status, router]);

        // if (status === 'loading') {
        //     return <div>Loading...</div>;
        // }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;