import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input type='text' value={text} onChange={handleChange} />
            <button type='submit'>검색</button>
        </form>
    );
}
