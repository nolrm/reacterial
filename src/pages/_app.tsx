import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import theme from '../theme';
import withAuth from '@/components/login/withAuth';
import '../styles/styles.scss';


function Auth({ children }: { children: JSX.Element }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if ( status === 'unauthenticated' && router.pathname != '/login') {
            if (router.pathname != '/') {
                router.push('/login'); // Redirect to sign-in page if not authenticated
            }
        }
    }, [status, router]);

    // if (status === 'loading') {
    //     return <div>Loading...</div>; // Show a loading state while checking authentication status
    // }

    return children;
}

const AuthWithHOC = withAuth(Auth);


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthWithHOC>
                    <Component {...pageProps} />
                </AuthWithHOC>
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;