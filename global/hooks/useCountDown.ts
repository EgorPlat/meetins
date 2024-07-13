import { useState, useEffect, useRef } from "react";

export const useCountDown = (dateStart: Date, dateEnd: Date) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = dateEnd.getTime() - new Date().getTime();
      const timeLeft = diff > 0 ? diff : 0;
      setTimeLeft(timeLeft);
    };

    intervalRef.current = setInterval(calculateTimeLeft, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dateEnd]);

  return timeLeft;
};
