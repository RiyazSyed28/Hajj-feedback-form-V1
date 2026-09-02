import { Outlet } from "react-router-dom";
import Navbar  from "../components/layouts/Navbar"
import Footer from "../components/layouts/Footer";

function MainLayout() {
    return (
        <>
            <Navbar />

            <main className="">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default MainLayout;