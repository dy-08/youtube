import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import { Skeleton } from '@mui/material';
import { fetchYoutubeVideos } from '../api/youtube';

export default function Videos() {
    const navigate = useNavigate();
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        data: selectedVideo,
    } = useQuery({
        queryKey: ['keyword', keyword],
        queryFn: async () => fetchYoutubeVideos(keyword),
    });
    if (isLoading) {
        return (
            <ul className='w-full grid grid-cols-3 gap-2 place-items-center'>
                {Array.from({ length: 25 }).map((_, i) => (
                    <li
                        key={i}
                        className='w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-stone-100'
                    >
                        <Skeleton animation='wave' variant='rectangular' width={'100%'} height={292} />
                        <Skeleton animation='wave' variant='text' width={'90%'} sx={{ fontSize: '1rem' }} />
                        <Skeleton animation='wave' variant='text' width={'20%'} sx={{ fontSize: '1rem' }} />
                        <Skeleton animation='wave' variant='text' width={'30%'} sx={{ fontSize: '1rem' }} />
                    </li>
                ))}
            </ul>
        );
    }
    if (error) return <p>{error.message}</p>;

    const handleClick = (item) => {
        console.log(item);
        const channelId = item.snippet.channelId;
        navigate(`/videos/videoDetail/${channelId}`, { state: item });
    };
    return (
        <ul className='w-full grid grid-cols-3 gap-2 place-items-center'>
            {selectedVideo.map((item) => (
                <li
                    key={item.etag}
                    className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out'
                    onClick={() => handleClick(item)}
                >
                    <Card
                        thumbnail={item.snippet.thumbnails}
                        title={item.snippet.title}
                        channelTitle={item.snippet.channelTitle}
                        publishedAt={item.snippet.publishedAt}
                        form='col'
                    />
                </li>
            ))}
        </ul>
    );
}
