import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDarkMode } from '../context/DarkModeContext';

export default function Search() {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setText('');
        navigate(`/videos/${text}`);
    };

    const { darkMode } = useDarkMode();

    return (
        <form onSubmit={handleSubmit} className='flex items-center'>
            <input
                className='dark:text-white lg:w-xl h-8 rounded-l-full border border-neutral-300 px-3'
                type='text'
                value={text}
                onChange={handleChange}
            />
            <button
                className='dark:dark:bg-zinc-800 w-16 h-8 rounded-r-full bg-neutral-200 text-center text-sm border-b border-r border-t border-neutral-300 cursor-pointer'
                type='submit'
            >
                {!darkMode && <IoSearchOutline className='text-xl m-auto' />}
                {darkMode && <IoSearchOutline className='text-xl m-auto dark:text-white' />}
            </button>
        </form>
    );
}
