import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';

export default function Home() {
  const {
    isLoading,
    error,
    data: contents,
  } = useQuery({
    queryKey: ['contents'],
    queryFn: async () => {
      return fetch(`/data/keyword.json`).then((res) => res.json());
    },
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  const { items } = contents;
  return (
    <ul className='w-full grid grid-cols-3 gap-2 place-items-center'>
      {items.map((item) => (
        <li
          key={item.id.videoId}
          className='w-full h-full overflow-hidden p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-stone-100'
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
