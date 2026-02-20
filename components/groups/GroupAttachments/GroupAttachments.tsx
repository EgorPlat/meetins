
import { IGroupFile } from "@/entities/groups";
import { baseURL } from "@/global/store/store";
import s from "./GroupAttachments.module.scss";
import { IoMdCloudDownload } from "react-icons/io";

export default function GroupPhotos(props: {
    images?: IGroupFile[]
    videos?: IGroupFile[]
}) {
    return (
        <div className={s.groupAttachments}>
            <div className={s.attachmentList}>
                {/*
                    props.images?.length === 0 
                        ? <div className={s.warning}>В сообществе нет фото</div> 
                        : props.images?.map(image => (
                            <img key={image.src} src={baseURL + image.src} className={s.image} />
                        ))
                */}
                {/*
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
                */}
                {
                    props.images && props.images.length !== 0 && (
                        props.images.map((el, index) => {
                            return (
                                <div className={s.elem} key={el.src}>
                                    <img className={s.image} src={baseURL + el.src}></img>
                                    <span>{el.type}_{index + 1}</span>
                                    <IoMdCloudDownload fontSize={24} />
                                </div>
                            )
                        })
                    )
                }
                {
                    props.videos && props.videos.length !== 0 && (
                        props.videos.map((el, index) => {
                            return (
                                <div className={s.elem} key={el.src}>
                                    <video className={s.image} src={baseURL + el.src}></video>
                                    <span>{el.type}_{index + 1}</span>
                                    <IoMdCloudDownload fontSize={24} />
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}