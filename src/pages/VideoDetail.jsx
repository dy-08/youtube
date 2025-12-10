import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoSideCard from '../components/VideoSideCard';
import { Skeleton } from '@mui/material';
import { fetchYoutubeVideos } from '../api/youtube';
import { useWidth } from '../context/WindowWidthContext';

export default function VideoDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=VtJ_2SbYoIM&key=AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8
    const videoId = state.id;
    const channel = state.snippet.channelTitle;
    // 테스트 코드
    // const videoId = state.id.videoId;

    /**
     * 사용자 화면(뷰포트) 크기에 따라 카드 레이아웃 형태('row' | 'col')를 결정
     * - Mobile / Tablet 구간에서는 세로 배치인 'col'을 반환
     * - Desktop 구간에서는 가로 배치인 'row'를 반환
     */
    const { isMobile, isTablet, isDesktop } = useWidth();
    const getResponsiveForm = (mobile, tablet, desktop) => {
        if (desktop) return 'row';
        if (tablet) return 'col';
        if (mobile) return 'col';

        return 'col';
    };

    const {
        isLoading,
        error,
        data: channelVideos = [],
    } = useQuery({
        queryKey: ['channelVideos', channel],
        queryFn: async () => fetchYoutubeVideos(channel),
        // 테스트 코드
        // queryFn: async () => {
        //     return await fetch('/data/videos-mock-page3.json').then((res) => res.json());
        // },
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
                <ul className='grid lg:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 w-full'>
                    {/* MOK 테스트 코드 */}
                    {/* {channelVideos.items.map((v, i) => (
                        <li
                            key={i}
                            className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
                            onClick={() => handleTest(v)}
                        >
                            <VideoSideCard
                                thumbnail={v.snippet.thumbnails}
                                title={v.snippet.title}
                                channelTitle={v.snippet.channelTitle}
                                publishedAt={v.snippet.publishedAt}
                                layout={getResponsiveForm(isMobile, isTablet, isDesktop)}
                            />
                        </li>
                    ))} */}
                    {/* API 코드 */}
                    {channelVideos.map((item) => (
                        <li
                            key={item.etag}
                            className='hover:bg-stone-100 dark:md:hover:bg-stone-100/10 w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
                            onClick={() => handleClick(item)}
                        >
                            <VideoSideCard
                                thumbnail={item.snippet.thumbnails}
                                title={item.snippet.title}
                                channelTitle={item.snippet.channelTitle}
                                publishedAt={item.snippet.publishedAt}
                                layout={getResponsiveForm(isMobile, isTablet, isDesktop)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
