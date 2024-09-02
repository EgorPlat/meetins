import { ReactNode, useEffect, useState } from "react"
import s from "./CustomShowUpComponent.module.scss";
import { useInView } from "react-intersection-observer";

interface ICustomShowUpComponentProps {
    children: ReactNode,
    side: "left" | "right" | "top" | "bottom"
    transitionType: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out"
}

export default function CustomShowUpComponent(props: ICustomShowUpComponentProps) {

    const isHorizontal = props.side === "left" || props.side === "right";
    const [once, setOnce] = useState<boolean>(false);
    const {ref, inView, entry} = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (!once && inView) {
            setOnce(true);
        }
    }, [inView]);

    return (
        <div className={s.wrapper} ref={ref} style={ !once ? { opacity: "0" } : { display: "1" }}>
            <div 
                className={isHorizontal && once ? s.horizontalyBlanket : s.verticalyBlanket}
                style={
                    isHorizontal ? 
                        { [props.side]: "0px", top: "0px" } :
                        { [props.side]: "0px", left: "0px" }
                }
            ></div>
            <div className={s.text}>
                {props.children}
            </div>
        </div>
    )
}