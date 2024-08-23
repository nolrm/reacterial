import Header from '@/components/landing/header';
import Banner from '@/components/landing/banner';
import Footer from '@/components/landing/footer';

const HomePage = () => {
    return (
        <div className="page-landing">
            <Header/>
            <main>
                <Banner/>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;