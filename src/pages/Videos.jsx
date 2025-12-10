import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
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
        // 테스트 코드
        // queryFn: async () => {
        //     return await fetch('/data/videos-mock-page2.json').then((res) => res.json());
        // },
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
        const channelId = item.snippet.channelId;
        navigate(`/videos/videoDetail/${channelId}`, { state: item });
    };
    // 테스트 코드
    // const handleTest = (video) => {
    //     const channelId = video.snippet.channelId;
    //     navigate(`/videos/videoDetail/${channelId}`, { state: video });
    // };

    return (
        <ul className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center'>
            {/* MOK 테스트 코드 */}
            {/* {selectedVideo.items.map((v, i) => (
                <li
                    key={i}
                    className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
                    onClick={() => handleTest(v)}
                >
                    <VideoCard
                        thumbnail={v.snippet.thumbnails}
                        title={v.snippet.title}
                        channelTitle={v.snippet.channelId}
                        publishedAt={v.snippet.publishedAt}
                        layout='col'
                    />
                </li>
            ))} */}
            {/* API 코드 */}
            {selectedVideo.map((item) => (
                <li
                    key={item.etag}
                    className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
                    onClick={() => handleClick(item)}
                >
                    <VideoCard
                        thumbnail={item.snippet.thumbnails}
                        title={item.snippet.title}
                        channelTitle={item.snippet.channelTitle}
                        publishedAt={item.snippet.publishedAt}
                        layout='col'
                    />
                </li>
            ))}
        </ul>
    );
}
