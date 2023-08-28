import Header from './Header';
import Footer from './Footer';

function Layout({ setPage, children }) {
    return (
        <>
            <Header setPage={setPage} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;