import ReactPlayer from "react-player"
import { baseURL } from "../../../../global/store/store";
import s from './videoPlayer.module.scss';

export default function VideoPlayer (props: { width: string, height: string, url: string }) {
    return (
        <ReactPlayer
            className={s.reactPlayer}
            url={baseURL + props.url}
            width={props.width}
            height={props.height}
        />
    )
}