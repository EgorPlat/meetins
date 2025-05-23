
import { IGroupFile } from "@/entities/groups";
import { baseURL } from "@/global/store/store";
import s from "./GroupAttachments.module.scss";

export default function GroupPhotos(props: {
    images?: IGroupFile[]
    videos?: IGroupFile[]
}) {
    return (
        <div className={s.groupAttachments}>
            <div className={s.attachmentList}>
                {
                    props.images?.length === 0 
                        ? <div className={s.warning}>В сообществе нет фото</div> 
                        : props.images?.map(image => (
                            <img key={image.src} src={baseURL + image.src} className={s.image} />
                        ))
                }
                {
                    props.videos?.length === 0 
                        ? <div className={s.warning}>В сообществе нет видео</div> 
                        : props.videos?.map(video => (
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