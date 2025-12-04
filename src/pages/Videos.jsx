import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';

export default function Videos() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: contents,
  } = useQuery({
    queryKey: ['keyword'],
    queryFn: async () => {
      // return fetch(
      //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8`
      // ).then((res) => res.json());
      return fetch(`/data/something.json`).then((res) => res.json());
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const { items } = contents;

  const handleClick = (item) => {
    console.log(item);
    const channelId = item.snippet.channelId;
    navigate(`/videos/videoDetail/${channelId}`, { state: item });
  };
  return (
    <ul className='w-full grid grid-cols-3 gap-2 place-items-center'>
      {items.map((item) => (
        <li
          key={item.etag}
          className='w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-stone-100'
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
