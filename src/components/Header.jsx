import Search from './Search';
import { MdDarkMode } from 'react-icons/md';

export default function Header() {
  return (
    <header className='w-full h-16 flex justify-between items-center px-8 bg-white'>
      <div className='flex items-center gap-0.3 cursor-pointer'>
        <div className='w-9 overflow-hidden'>
          <img className='w-full h-full' src='/youtube.svg' alt='유투브 로고' />
        </div>
        <p className='text-2xl tracking-tighter font-bold font-mono'>Youtube</p>
      </div>
      <Search />
      <div className='cursor-pointer'>
        <MdDarkMode className='text-xl' />
      </div>
    </header>
  );
}
