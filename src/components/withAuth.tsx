import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const withAuth = (WrappedComponent: ComponentType) => {

    const WithAuthComponent: React.FC = (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'loading') return; // Do nothing while loading
            if (!session && router.pathname !== '/signin') {
                router.push('/signin');
            }
        }, [session, status, router]);

        if (status === 'loading' || !session) {
            return <div>Loading...</div>; // Show loading while checking authentication
        }

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuthComponent;
};

function getDisplayName(WrappedComponent: ComponentType) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;