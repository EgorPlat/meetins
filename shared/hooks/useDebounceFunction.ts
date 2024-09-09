import { useEffect, useRef } from "react";

export default function useDebounceFunction(callback: any, delay: number) {

    const timerRef = useRef(null);
    const isCallApplyed = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const debouncedFunc = (...args) => {
        if (isCallApplyed.current) {
            callback(...args);
            isCallApplyed.current = false;
            timerRef.current = setTimeout(() => {
                isCallApplyed.current = true;
            }, delay);
        }
    };

    return debouncedFunc;
}