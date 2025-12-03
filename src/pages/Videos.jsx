import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

export default function Videos() {
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        data: contents,
    } = useQuery({
        queryKey: ['keyword'],
        queryFn: async () => {
            return fetch(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8`
            ).then((res) => res.json());
        },
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    const { items } = contents;
    console.log(items);
    return (
        <ul className='m-auto grid grid-cols-3 gap-2 place-items-center place-content-center'>
            {items.map((item) => (
                <li key={item.id.videoId} className='w-full p-2'>
                    <Card
                        thumbnail={item.snippet.thumbnails}
                        title={item.snippet.title}
                        channelTitle={item.snippet.channelTitle}
                        publishedAt={item.snippet.publishedAt}
                    />
                </li>
            ))}
        </ul>
    );
}
