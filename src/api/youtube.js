const API_KEY = 'AIzaSyC8t3lJJURohhFXjaA4dDmwfjPivbchDR8';

const isEmbeddable = async (videoIds) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${videoIds.join(
        ','
    )}&key=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('영상 상세 요청 실패');

    const data = await res.json();
    const filteredData = data.items.filter((d) => d.status.embeddable === true && d.status.privacyStatus === 'public');
    return filteredData ?? [];
};

// 검색해서 "임베드 가능한 영상만" 리턴하는 함수
export const fetchYoutubeVideos = async (keyword) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${keyword}&key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('요청 실패');

    const { items } = await res.json();
    const videoIds = items.map((v) => v.id.videoId);

    const result = await isEmbeddable(videoIds);
    return result;
};
