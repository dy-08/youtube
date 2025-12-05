import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import { Skeleton } from '@mui/material';
import { fetchYoutubeVideos } from '../api/youtube';

export default function VideoDetail() {
    const { state } = useLocation();
    // https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=VtJ_2SbYoIM&key=AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8
    const videoId = state.id;
    const channel = state.snippet.channelTitle;
    const {
        isLoading,
        error,
        data: channelVideos = [],
    } = useQuery({
        queryKey: ['channelVideos', channel],
        queryFn: async () => fetchYoutubeVideos(channel),
    });
    if (isLoading) {
        return (
            <section className='flex-1 flex flex-row px-30 gap-6 h-[calc(100dvh-64px)]'>
                <div className='w-5/7'>
                    <div className='rounded-xl aspect-video overflow-hidden'>
                        <Skeleton animation='wave' variant='rectangular' width='100%' height='100%' />
                    </div>
                    <Skeleton animation='wave' variant='text' width='80%' sx={{ fontSize: '1rem' }} />
                    <Skeleton animation='wave' variant='text' width='20%' sx={{ fontSize: '1rem' }} />
                    <Skeleton animation='wave' variant='text' width='40%' sx={{ fontSize: '1rem' }} />
                    <Skeleton animation='wave' variant='text' width='60%' sx={{ fontSize: '1rem' }} />
                </div>
                <div className='w-2/7 h-screen overflow-scroll overflow-x-hidden box-border'>
                    <ul className='flex flex-col w-full box-border space-y-4'>
                        {Array.from({ length: 25 }).map((_, i) => (
                            <li key={i} className='flex flex-row gap-2'>
                                <div className='w-2/5 h-[94px]'>
                                    <Skeleton animation='wave' variant='rectangular' width='100%' height='100%' />
                                </div>
                                <div className='w-3/5 h-[94px]'>
                                    <Skeleton animation='wave' variant='text' width='96%' sx={{ fontSize: '1rem' }} />
                                    <Skeleton animation='wave' variant='text' width='20%' sx={{ fontSize: '0.8rem' }} />
                                    <Skeleton animation='wave' variant='text' width='60%' sx={{ fontSize: '0.8rem' }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }
    if (error) return <p>{error.message}</p>;

    return (
        <section className='flex-1 flex flex-row px-30 gap-6 h-[calc(100dvh-64px)]'>
            {/* 유투브 아이프레임 및 정보 */}
            <div className='w-5/7'>
                <iframe
                    width='100%'
                    className='rounded-xl aspect-video'
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                    title={state.snippet.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                ></iframe>
                <p>{state.snippet.title}</p>
                <p>{state.snippet.channelTitle}</p>
                <div>
                    <p>{state.snippet.publishedAt}</p>
                    <p>{state.snippet.description}</p>
                </div>
            </div>
            {/* 해당 채널 비디오 목록 */}
            <div className='w-2/7 h-screen overflow-scroll overflow-x-hidden box-border'>
                <ul className='flex flex-col w-full'>
                    {channelVideos.map((item) => (
                        <li key={item.etag} className='flex'>
                            <Card
                                thumbnail={item.snippet.thumbnails}
                                title={item.snippet.title}
                                channelTitle={item.snippet.channelTitle}
                                publishedAt={item.snippet.publishedAt}
                                form='row'
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
