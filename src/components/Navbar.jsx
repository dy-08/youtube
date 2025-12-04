import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='w-2xs text-center h-screen py-3'>
      <div className='flex flex-col justify-center items-center px-3'>
        <Link
          className='w-full h-10 text-sm font-medium leading-10 rounded-lg hover:bg-stone-300/30'
          to='/'
        >
          홈
        </Link>
        <Link
          className='w-full h-10 text-sm font-medium leading-10 rounded-lg hover:bg-stone-300/30'
          to='/short'
        >
          Short
        </Link>
      </div>
    </nav>
  );
}
