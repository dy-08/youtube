export default function Card({ thumbnail, title, channelTitle, publishedAt }) {
  return (
    <article className='w-full h-102 overflow-hidden cursor-pointer p-2.5 transition duration-300 ease-in-out hover:bg-stone-700/10 hover:rounded-xl box-border'>
      <div className='w-lg overflow-hidden aspect-video rounded-md'>
        <img
          className='w-full h-full object-cover transition duration-300 ease-in-out hover:scale-98'
          src={thumbnail.high.url}
          alt='thumbnail'
        />
      </div>
      <div className='p-2 w-lg'>
        <p className='text-base font-semibold line-clamp-2'>{title}</p>
        <p className='text-sm'>{channelTitle}</p>
        <p className='text-sm'>{publishedAt}</p>
      </div>
    </article>
  );
}
