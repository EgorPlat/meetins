import { IGroupFile } from "../../../../global/interfaces/groups";
import { baseURL } from "../../../../global/store/store";
import s from "./GroupAttachments.module.scss";

export default function GroupPhotos(props: {
    images?: IGroupFile[]
    videos?: IGroupFile[]
}) {
    return (
        <div className={s.groupAttachments}>
            <div className={s.attachmentList}>
                {
                    props.images && 
                    props.images.map(image => (
                        <img key={image.src} src={baseURL + image.src} className={s.image} />
                    ))
                }
                {
                    props.videos &&
                    props.videos.map(video => (
                        <video className={s.video} controls key={video.src}>
                            <source 
                                src={baseURL + video.src} 
                                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                                height="150px"
                                width="150px"
                            ></source>
                        </video>
                    ))
                }
            </div>
        </div>
    )
}