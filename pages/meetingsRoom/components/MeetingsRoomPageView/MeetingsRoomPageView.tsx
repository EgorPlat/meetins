import { baseURL } from "../../../../global/store/store";
import { CiBookmarkPlus, CiSquarePlus } from "react-icons/ci";
import s from "./MeetingsRoomPageView.module.scss";
import CustomProgressBar from "../../../../global/components-ui/CustomProgressBar/CustomProgressBar";
import { IMeeting } from "../../../../global/interfaces/meetings";
import CustomLoader from "../../../../global/components-ui/CustomLoader/CustomLoader";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../global/functions/getDateInYYYYMMDDHHFormat";
import { ChangeEvent, useRef } from "react";
import Link from "next/link";

export default function MeetingsRoomPageView(props: {
    selectedMeeting: IMeeting,
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void,
    handleAddComment: () => void,
    handleRegInMeeting: (meetingId: string) => void,
    handleOpenAllFiles: () => void,
    isUserInParticipants: boolean
}) {
    const mediaRef = useRef<HTMLInputElement>(null);
    
    if (props.selectedMeeting) {
        return (
            <div className={s.meetingsRoom}>
                <div className={s.topContent}>
                    <div className={s.mainInfo}>
                        <img 
                            src={baseURL + props.selectedMeeting.preview} 
                            width="150px" 
                            height="150px"
                            className={s.photo}
                        />
                        <div className={s.title}>{props.selectedMeeting.title}</div>
                    </div>
                    <div className={s.moreInfo}>
                        <div className={s.activityBar}>
                            <CustomProgressBar
                                text='Люди, записавшиеся на встречу: '
                                width='calc(100% - 30px)'
                                height='30px'
                                max={25}
                                value={props.selectedMeeting.participants.length}
                            />
                            <CiBookmarkPlus
                                className={s.addMember}
                                title='Записаться на встречу'
                                fontSize={37}
                                onClick={() => props.handleRegInMeeting(props.selectedMeeting.meetingId)}
                            />
                        </div>
                        <div className={s.tags}>
                            Цели: {props.selectedMeeting.goal}
                        </div>
                        <div className={s.dates}>
                            Даты проведения: {customizeDateToYYYYMMDDHHMMFormat(String(props.selectedMeeting.date))}
                        </div>
                        <div className={s.description}>
                            Описание: {props.selectedMeeting.description}
                            <span> Приходите по адресу: {props.selectedMeeting.address}</span>
                        </div>
                        <div className={s.members}>
                            <div className={s.list}>
                                {
                                    props.selectedMeeting.participants.map(el => (
                                        <div className={s.user} key={el.login}>
                                            <div className={s.avatar}>
                                                <Link href={`/profile/${el.login}`}>
                                                    <img src={baseURL + el.avatar} width="100%" height="100%" />
                                                </Link>
                                            </div>
                                            <div className={s.name}>{el.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomContent}>
                    <div className={s.mediaInfo}>
                        <div className={s.title}>
                            <span className={s.text}>Фотографии  и видео со встречи:</span>
                            <CiSquarePlus
                                className={s.addMedia}
                                fontSize={30}
                                onClick={() => mediaRef.current.click()}
                            />
                            <input
                                accept='.jpg, .jpeg, .png, .mp4'
                                type='file' 
                                className={s.loadMeetingMediaFile} 
                                ref={mediaRef}
                                onChange={props.handleFileUpload}
                            />
                        </div>
                        <div className={s.content}>
                            {
                                props.selectedMeeting.files.length === 0 &&
                                <span className={s.message}>Пока никто не загружал видео или фото со встречи.</span>
                            }
                            {
                                props.selectedMeeting.files.slice(0, 9).map(el => (
                                    el.type.includes("image") 
                                        ? <img 
                                            key={el.src} 
                                            src={baseURL + el.src} 
                                        /> :
                                        el.type.includes("video") 
                                        && <video
                                            key={el.src} 
                                            src={baseURL + el.src}
                                            controls
                                        />
                                ))
                            }
                            {
                                props.selectedMeeting.files.length >= 9 &&
                                    <span 
                                        className={s.moreMedia}
                                        onClick={props.handleOpenAllFiles}
                                    >Ещё...</span>
                            }
                        </div>
                    </div>
                    <div className={s.commentsInfo}>
                        <div className={s.title}>
                            <span className={s.text}>Комментарии к данной встрече:</span>
                            <CiSquarePlus
                                className={s.addComment}
                                fontSize={30}
                                onClick={props.handleAddComment}
                            />
                        </div>
                        <div className={s.content}>
                            {
                                props.selectedMeeting.comments.length === 0 &&
                                <span className={s.message}>Пока никто не комментировал данную встречу.</span>
                            }
                            {
                                props.isUserInParticipants 
                                    ? props.selectedMeeting.comments.map(comment => {
                                        const { name, avatar } = 
                                    props.selectedMeeting.participants.filter(el => el.userId === comment.userId)[0]
                                        return (
                                            <div className={s.comment} key={String(comment.date)}>
                                                <div className={s.userInfo}>
                                                    <div className={s.avatar}>
                                                        <img src={baseURL + avatar} />
                                                    </div>
                                                    <div className={s.name}>
                                                        {name}
                                                    </div>
                                                </div>
                                                <div className={s.commentContent}>
                                                    {
                                                        comment.text
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                    : 
                                    <span
                                        style={{textAlign: "center", fontSize: "15px"}}
                                    >Перед тем как принять участие в обсуждении, запишитесь на встречу.</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <CustomLoader />
    }
}