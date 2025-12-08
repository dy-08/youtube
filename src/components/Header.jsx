import Search from './Search';
import { MdDarkMode } from 'react-icons/md';
import { useDarkMode } from '../context/DarkModeContext';

export default function Header() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const handleClick = () => {};
    return (
        <header className='dark:bg-zinc-800 w-full h-16 flex justify-between items-center px-8 bg-white'>
            <div className='flex items-center gap-0.3 cursor-pointer'>
                <div className='w-9 overflow-hidden'>
                    <img className='w-full h-full' src='/youtube.svg' alt='유투브 로고' onClick={handleClick} />
                </div>
                <p className='dark:text-white text-2xl tracking-tighter font-bold'>Youtube</p>
            </div>
            <Search />
            <div className='cursor-pointer' onClick={toggleDarkMode}>
                {!darkMode && <MdDarkMode className='text-xl' />}
                {darkMode && <MdDarkMode className='text-xl dark:text-white' />}
            </div>
        </header>
    );
}
