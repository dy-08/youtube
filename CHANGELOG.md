## 0.2.1 - 2025-12-11

- VideoDetail 페이지에서 채널 연관 영상 클릭 시 동일 페이지에서 재생되도록 처리
  (채널 ID로 조회한 영상들을 사이드 리스트로 표시)
- 다크 모드 토글 및 전체 레이아웃 다크 테마 스타일 적용
- Tailwind 기반 반응형 레이아웃(mobile / sm / lg) 1차 정리 및 목데이터 fetch 테스트 코드 추가
- WindowWidthContext / useWidth 커스텀 훅 도입으로 헤더·카드 반응형 리팩토링
- 테스트용 mock fetch 제거 후 실제 YouTube API 연동으로 데이터 패칭 경로 일원화
- 비디오 리스트 아이템 hover 배경색 통일
  - before: `hover:bg-stone-100 px-2 dark:md:hover:bg-stone-100/10`
  - after: `hover:bg-stone-800/10 dark:hover:bg-stone-100/10`

## 0.2.0 - 2025-12-05

- 목업 JSON 대신 실제 YouTube Search/Videos API 연동
- `isEmbeddable` 유틸로 임베드 불가·비공개 영상 필터링
- `fetchYoutubeVideos` 공통 함수로 Home/Videos/VideoDetail 데이터 패칭 로직 통합

## 0.1.1 - 2025-12-04

- MUI/Emotion 패키지 설치 및 스켈레톤 UI 적용

## 0.1.0 - 2025-12-04

- 프리텐다드 폰트 적용
- Card 컴포넌트 form prop 추가로 row/col 레이아웃 지원
- 전체적인 스타일 리터치
