import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import VideoDetail from './pages/VideoDetail';
import Short from './pages/Short';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: 'short', element: <Short /> },
            { path: 'videos', element: <Videos /> },
            { path: 'videos/:videoId', element: <VideoDetail /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
