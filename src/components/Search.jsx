import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

export default function Search() {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setText(e.target.value);
        console.log(text);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setText('');
        navigate(`/videos/${text}`);
    };

    return (
        <form onSubmit={handleSubmit} className='flex items-center'>
            <input
                className='w-xl h-8 rounded-l-full border border-neutral-300'
                type='text'
                value={text}
                onChange={handleChange}
            />
            <button
                className='w-16 h-8 rounded-r-full bg-neutral-200 text-center text-sm border-b border-r border-t border-neutral-300 cursor-pointer'
                type='submit'
            >
                <IoSearchOutline className='text-xl m-auto' />
            </button>
        </form>
    );
}
