import { useEffect, useState } from "react";

export const useScrollDownInfo = (maxPage: number, isClearNeeded: boolean, handleIsCleared: () => void) => {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [arrayHeights, setArrayHeights] = useState([]);

    const handleScroll = () => {
                
        const isScrollEnded = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight;
        const isPageDoesntExists = !arrayHeights.includes(document.body.offsetHeight);
        const isNewPageAreMoreThenMax = arrayHeights.length < maxPage || maxPage === 0;
        
        if (isScrollEnded && isPageDoesntExists && isNewPageAreMoreThenMax) {
            setArrayHeights((lastValue) => [...lastValue, document.body.offsetHeight]);
            setCurrentPageNumber((lastValue) => lastValue + 1);
        }
    }
    useEffect(() => {
        if (isClearNeeded) {
            setArrayHeights(() => []);
            setCurrentPageNumber(() => 0);
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