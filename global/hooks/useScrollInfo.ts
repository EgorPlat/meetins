import { useEffect, useState } from "react";

export const useScrollDownInfo = (maxPage: number, isClearNeeded: boolean, handleIsCleared: () => void) => {

    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [arrayHeights, setArrayHeights] = useState([]);

    const handleScroll = () => {
        const currentScrollPosition = window.innerHeight + Math.ceil(window.pageYOffset);
        const isScrollEnded = currentScrollPosition >= document.body.scrollHeight - 10;
        
        const isPageDoesntExists = !arrayHeights.includes(document.body.scrollHeight);
        const isNewPageAreMoreThenMax = arrayHeights.length + 1 < maxPage || maxPage === 0;
        
        if (isScrollEnded && isPageDoesntExists && isNewPageAreMoreThenMax) {
            setArrayHeights((lastValue) => [...lastValue, document.body.scrollHeight]);
            setCurrentPageNumber((lastValue) => lastValue + 1);
        }
    };
    
    useEffect(() => {
        if (isClearNeeded) {
            setArrayHeights(() => []);
            setCurrentPageNumber(() => 1);
            handleIsCleared();
        }
    }, [isClearNeeded]);

    useEffect(() => {        
        window.addEventListener("scroll", handleScroll);  
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [arrayHeights]);
    
    if (currentPageNumber !== 0) return currentPageNumber;
}