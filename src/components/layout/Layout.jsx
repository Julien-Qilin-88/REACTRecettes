import Header from './Header';
import Footer from './Footer';

function Layout({ setPage, children, isAuthenticated, setIsAuthenticated }) {
    return (
        <>
            <Header setPage={setPage} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;