import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function Root() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <div className='flex'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
