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
          {items.map((item) => (
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
