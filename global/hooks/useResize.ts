import { useEffect, useState } from "react"

export const useResize = () => {

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isUnAdaptive, setIsUnAdaptive] = useState<boolean>(false);

    const handleResize = () => {
		if (window.innerWidth <= 1000) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
		if (window.innerWidth > 1900) {
			setIsUnAdaptive(true);
		}
	};

    useEffect(() => {
		handleResize();
        window.addEventListener('resize', handleResize);
		return () => {
		    window.removeEventListener('resize', handleResize);
		};  
    }, []);

    return { isMobile, isUnAdaptive };
}