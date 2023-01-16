import { useEffect, useState } from "react";

export const useScrollInfo = (maxPage: number, isClearNeeded: boolean, isUpdated: () => void) => {

    const [lastScrollFromTopValue, setLastScrollFromTopValue] = useState(0);
    const [arrayHeights, setArrayHeights] = useState([]);

    const handleScroll = () => {
        const isScrollEnded = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight;
        const isPageAlreadyExists = !arrayHeights.includes(document.body.offsetHeight);
        const isNewPageAreMoreThenMax = arrayHeights.length < maxPage || maxPage === 0;

        if (isScrollEnded && isPageAlreadyExists && isNewPageAreMoreThenMax) {
            setArrayHeights((lastValue) => [...lastValue, document.body.offsetHeight]);
            setLastScrollFromTopValue((lastValue) => lastValue + 1);
        }
    }

    useEffect(() => {
        if (isClearNeeded) {
            setArrayHeights(() => []);
            setLastScrollFromTopValue(() => 0);
            isUpdated();
        }
    }, [isClearNeeded]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);  
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [arrayHeights]);

    return lastScrollFromTopValue;
}