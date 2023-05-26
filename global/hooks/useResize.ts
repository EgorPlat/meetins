import { useEffect, useState } from "react"

export const useResize = () => {

    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    const handleResize = () => {
		if (window.innerWidth <= 810) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

    useEffect(() => {
        window.addEventListener('resize', handleResize);
		return () => {
		    window.removeEventListener('resize', handleResize);
		};  
    }, []);

    return isMobile;
}