import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import VideoDetail from './pages/VideoDetail';
import Short from './pages/Short';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DarkModeProvider from './context/DarkModeContext';
import WindowWidthProvider from './context/WindowWidthContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: 'short', element: <Short /> },
            { path: 'videos/:keyword', element: <Videos /> },
            { path: 'videos/videoDetail/:channelId', element: <VideoDetail /> },
        ],
    },
]);

const queryClient = new QueryClient();
export default function App() {
    return (
        <DarkModeProvider>
            <WindowWidthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </WindowWidthProvider>
        </DarkModeProvider>
    );
}
