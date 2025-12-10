import Search from './Search';
import { MdDarkMode } from 'react-icons/md';
import { useDarkMode } from '../context/DarkModeContext';
import { useWidth } from '../context/WindowWidthContext';
import { IoSearchOutline } from 'react-icons/io5';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

export default function Header() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [search, setSearch] = useState(false);
    const toggleSearch = () => setSearch(!search);
    const { isMobile } = useWidth();
    return (
        <header className='dark:bg-zinc-800 w-full h-16 flex justify-between items-center px-4 bg-white box-border'>
            {!search && (
                <div className='flex justify-between lg:flex-row items-center gap-0.3 cursor-pointer'>
                    <div className='w-9 overflow-hidden'>
                        <img className='w-full h-full' src='/youtube.svg' alt='유투브 로고' />
                    </div>
                    <p className='dark:text-white text-xl lg:text-2xl tracking-tighter font-bold'>Youtube</p>
                </div>
            )}
            <div onClick={toggleSearch} className='cursor-pointer'>
                {isMobile && !darkMode && search && <IoIosArrowForward className='text-2xl' />}
                {isMobile && darkMode && search && <IoIosArrowForward className='text-2xl dark:text-white' />}
            </div>
            <div>{!isMobile && <Search layout={'desktop'} />}</div>
            <div className='flex items-center cursor-pointer gap-1.5'>
                {isMobile && search && <Search layout={'mobile'} />}
                <div onClick={toggleSearch}>
                    {isMobile && !darkMode && !search && <IoSearchOutline className='text-2xl m-auto' />}
                    {isMobile && darkMode && !search && <IoSearchOutline className='text-2xl m-auto dark:text-white' />}
                </div>
                <div onClick={toggleDarkMode}>
                    {!darkMode && <MdDarkMode className='text-2xl' />}
                    {darkMode && <MdDarkMode className='text-2xl dark:text-white' />}
                </div>
            </div>
        </header>
    );
}
