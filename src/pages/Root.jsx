import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function Root() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/videos/videoDetail');
  return (
    <div className='overflow-hidden font-sans'>
      <Header />
      <div className='flex'>
        {!hideNavbar && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
}
