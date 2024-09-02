import { ReactChild, useEffect, useRef } from "react";
import s from "./InfinityScroll.module.scss";

interface IInfinityScrollProps {
    maxPage: number,
    children: ReactChild,
    handleIncreaseCurrentPage: () => void,
    handleUpdateCurrentPage: (newPage: number) => void,
};

export default function InfinityScroll({
    maxPage,
    children,
    handleIncreaseCurrentPage,
    handleUpdateCurrentPage
}: IInfinityScrollProps) {

    const scrollRef = useRef<HTMLDivElement>(null);
  
    const handleScroll = () => {
        if (scrollRef.current) {
            const isScrollEnded =
          scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
          scrollRef.current.clientHeight;
            if (isScrollEnded) {
                handleIncreaseCurrentPage();
            }
        }
    };
  
    useEffect(() => {
        handleUpdateCurrentPage(1);
    }, [maxPage]);

  
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
  
    return (
        <div className={s.infinityWrapper} ref={scrollRef}>
            {children}
        </div>
    );
}