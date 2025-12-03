import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
export default function VideoDetail() {
    const { state } = useLocation();

    // https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=4FvqdZtH4xo&key=AIzaSyBlQ4zpUqnIzLEc3a9q2g8qeve9YhBJMQQ
    console.log('state: ', state);
    const videoId = state.id.videoId;
    const {
        isLoading,
        error,
        data: channelVideos,
    } = useQuery({
        queryKey: ['channelVideos'],
        queryFn: async () => {
            return fetch(`/data/someone.json`).then((res) => res.json());
        },
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    const { items } = channelVideos;
    console.log('channelVideos: ', items);
    return (
        <section className='flex-1 flex flex-row px-4'>
            <div className='w-4/5'>
                <iframe
                    width='1250'
                    height='703'
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
            <div className='w-1/5 bg-stone-500/20'>
                {/* 해당 채널 비디오 목록 */}
                <ul className='flex flex-col w-full'>
                    {items.map((item) => (
                        <li key={item.etag}>
                            <Card
                                thumbnail={item.snippet.thumbnails}
                                title={item.snippet.title}
                                channelTitle={item.snippet.channelTitle}
                                publishedAt={item.snippet.publishedAt}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
