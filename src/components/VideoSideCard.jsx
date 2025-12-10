export default function VideoSideCard({ thumbnail, title, channelTitle, publishedAt, layout }) {
    const cardLayout = layout === 'row' ? 'grid-flow-col' : 'grid-flow-row';

    return (
        <article className={`grid ${cardLayout} gap-2 box-border`}>
            <div
                className={`rounded-xl lg:min-w-[80px] lg:max-w-[140px] overflow-hidden transition-all duration-300 ease-in-out hover:rounded-none`}
            >
                <img className={`w-full h-full object-cover`} src={thumbnail.high.url} alt='thumbnail' />
            </div>
            <div className={`h-full lg:w-full my-2`}>
                <p className='dark:text-white text-base font-semibold line-clamp-2'>{title}</p>
                <p className='dark:text-white text-sm'>{channelTitle}</p>
                <p className='dark:text-white text-sm'>{publishedAt}</p>
            </div>
        </article>
    );
}
