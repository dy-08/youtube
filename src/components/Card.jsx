import { useState, useEffect } from 'react';

export default function Card({ thumbnail, title, channelTitle, publishedAt, form }) {
    // 윈도우 넓이
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isTablet = width >= 640 && width < 1024; // lg
    const isDesktop = width >= 1024; // lg
    console.log(isTablet, isDesktop);
    return (
        <article
            className={`w-full grid grid-flow-${form} ${isTablet && 'grid-cols-2 gap-4'} ${
                isDesktop && 'grid-cols-1 gap-2'
            } box-border`}
        >
            <div
                className={`${isDesktop && 'w-full'} ${
                    form === 'col' ? 'w-full h-[292px]' : 'w-2/5 h-[160px]'
                } rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:rounded-none`}
            >
                <img
                    className={`w-full h-full object-cover ${form === 'col' ? 'scale-105' : 'scale-110'}`}
                    src={thumbnail.high.url}
                    alt='thumbnail'
                />
            </div>
            <div className={`${form === 'col' ? 'w-full' : 'w-3/5'} h-full my-2`}>
                <p className='dark:text-white text-base font-semibold line-clamp-2'>{title}</p>
                <p className='dark:text-white text-sm'>{channelTitle}</p>
                <p className='dark:text-white text-sm'>{publishedAt}</p>
            </div>
        </article>
    );
}
