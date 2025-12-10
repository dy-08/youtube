export default function VideoCard({ thumbnail, title, channelTitle, publishedAt, layout }) {
    return (
        <article className={`grid ${layout} w-full h-full box-border`}>
            <div
                className={`aspect-video rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:rounded-none`}
            >
                <img className={`w-full h-full object-cover`} src={thumbnail.high.url} alt='thumbnail' />
            </div>
            <div className={`h-full my-2`}>
                <p className='dark:text-white text-base font-semibold line-clamp-2'>{title}</p>
                <p className='dark:text-white text-sm'>{channelTitle}</p>
                <p className='dark:text-white text-sm'>{publishedAt}</p>
            </div>
        </article>
    );
}
