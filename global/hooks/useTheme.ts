import { useEffect, useState } from "react";

export const useTheme = () => {
    
    const [currentTheme, setCurrentTheme] = useState<string>("");
    
    useEffect(() => {
        if (localStorage.getItem('data-theme') === 'white') {
            setCurrentTheme("white");
        } else {
            setCurrentTheme("black");
        }
    }, []);

    useEffect(() => {
		document.documentElement.setAttribute("data-theme", currentTheme);
	}, [currentTheme]);

    return currentTheme;
}