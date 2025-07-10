import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Footer } from '../components/footer/Footer';


const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50" > 
                <Navbar />
            </header>

            {/* Main Content - This is where all your pages will render */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;