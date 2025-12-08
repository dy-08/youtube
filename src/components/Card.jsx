export default function Card({ thumbnail, title, channelTitle, publishedAt, form }) {
    return (
        <article className={`w-full flex flex-${form} box-border ${form === 'row' && 'gap-2 my-1'}`}>
            <div
                className={`${
                    form === 'col' ? 'w-full h-[292px]' : 'w-2/5 h-[94px]'
                } rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:rounded-none`}
            >
                <img
                    className={`w-full h-full object-cover ${form === 'col' ? 'scale-105' : 'scale-110'}`}
                    src={thumbnail.high.url}
                    alt='thumbnail'
                />
            </div>
            <div className={`${form === 'col' ? 'w-full' : 'w-3/5'} h-full`}>
                <p className='dark:text-white text-base font-semibold line-clamp-2'>{title}</p>
                <p className='dark:text-white text-sm'>{channelTitle}</p>
                <p className='dark:text-white text-sm'>{publishedAt}</p>
            </div>
        </article>
    );
}
