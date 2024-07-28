// import withAuth from '../components/withAuth';
import { useSession, signIn, signOut } from 'next-auth/react';
import Header from '@/components/landing/header';
import Banner from '@/components/landing/banner';
import Footer from '@/components/landing/footer';

const HomePage = () => {
    const { data: session, status } = useSession();

    return (
        <div>
            <Header/>
            <main>
                <Banner/>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;