import React, { createContext, useState, useEffect, useContext } from 'react';

const WindowWidthContext = createContext();
export default function WindowWidthProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024; // sm
    const isDesktop = width >= 1024; // lg
    return (
        <WindowWidthContext.Provider value={{ isMobile, isTablet, isDesktop }}>{children}</WindowWidthContext.Provider>
    );
}
export const useWidth = () => useContext(WindowWidthContext);
