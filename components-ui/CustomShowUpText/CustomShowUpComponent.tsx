import { ReactNode } from "react"
import s from './CustomShowUpComponent.module.scss';

interface ICustomShowUpComponentProps {
    children: ReactNode,
    side: "left" | "right" | "top" | "bottom"
    transitionType: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out"
}

export default function CustomShowUpComponent(props: ICustomShowUpComponentProps) {

    const isHorizontal = props.side === "left" || props.side === "right";
    return (
        <div className={s.wrapper}>
            <div 
                className={isHorizontal ? s.horizontalyBlanket : s.verticalyBlanket}
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