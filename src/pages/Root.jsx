import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useDarkMode } from '../context/DarkModeContext';
import { useWidth } from '../context/WindowWidthContext';

export default function Root() {
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith('/videos/videoDetail');
    const { darkMode } = useDarkMode();
    const { isDesktop } = useWidth();
    return (
        <section className={darkMode == true ? 'dark' : ''}>
            <div className='dark:bg-zinc-800 overflow-hidden font-sans'>
                <Header />
                <div className='flex'>
                    {!hideNavbar && isDesktop && <Navbar />}
                    <Outlet />
                </div>
            </div>
        </section>
    );
}
