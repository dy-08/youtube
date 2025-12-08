import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchYoutubeVideos } from '../api/youtube';

export default function VideoDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=VtJ_2SbYoIM&key=AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8
    // const videoId = state.id;
    const channel = state.snippet.channelTitle;
    // 테스트 코드
    const videoId = state.id.videoId;
    //
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
    const isDesktop = width >= 1024; // lg

    const {
        isLoading,
        error,
        data: channelVideos = [],
    } = useQuery({
        queryKey: ['channelVideos', channel],
        // queryFn: async () => fetchYoutubeVideos(channel),
        // 테스트 코드
        queryFn: async () => {
            return await fetch('/data/videos-mock-page3.json').then((res) => res.json());
        },
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
    const handleClick = (item) => {
        const channelId = item.snippet.channelId;
        navigate(`/videos/videoDetail/${channelId}`, { state: item });
    };

    return (
        <section className='flex-1 flex flex-col lg:flex-row lg:px-4 gap-6 lg:h-[calc(100dvh-64px)]'>
            {/* 유투브 아이프레임 및 정보 */}
            <div className='w-full lg:w-5/7'>
                <iframe
                    width='100%'
                    className='lg:rounded-xl aspect-video'
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                    title={state.snippet.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                ></iframe>
                <p className='dark:text-white px-3 my-4 text-lg font-semibold'>{state.snippet.title}</p>
                <p className='dark:text-white px-3 text-lg font-semibold'>{state.snippet.channelTitle}</p>
                <div className='px-3 dark:bg-zinc-200/8 bg-zinc-400/30 p-4 m-4 rounded-xl'>
                    <p className='dark:text-white text-xs mb-2 text-right'>{state.snippet.publishedAt}</p>
                    <p className='dark:text-white text-sm'>{state.snippet.description}</p>
                </div>
            </div>
            {/* 해당 채널 비디오 목록 */}
            <div className='w-full lg:w-2/7 h-full lg:h-screen lg:overflow-scroll lg:overflow-x-hidden box-border'>
                <ul className='flex flex-col w-full'>
                    {/* MOK 테스트 코드 */}
                    {channelVideos.items.map((v, i) => (
                        <li
                            key={i}
                            className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
                            onClick={() => handleTest(v)}
                        >
                            <Card
                                thumbnail={v.snippet.thumbnails}
                                title={v.snippet.title}
                                channelTitle={v.snippet.channelTitle}
                                publishedAt={v.snippet.publishedAt}
                                form={isDesktop ? 'row' : 'col'}
                            />
                        </li>
                    ))}
                    {/* API 코드 */}
                    {/* {channelVideos.map((item) => (
                        <li
                            key={item.etag}
                            className='flex hover:bg-stone-100 dark:md:hover:bg-stone-100/10 cursor-pointer'
                            onClick={() => handleClick(item)}
                        >
                            <Card
                                thumbnail={item.snippet.thumbnails}
                                title={item.snippet.title}
                                channelTitle={item.snippet.channelTitle}
                                publishedAt={item.snippet.publishedAt}
                                form='row'
                            />
                        </li>
                    ))} */}
                </ul>
            </div>
        </section>
    );
}
