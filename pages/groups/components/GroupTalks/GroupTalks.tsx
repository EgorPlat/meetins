import Link from "next/link";
import s from "./GroupTalks.module.scss";
import { IGroupTalk } from "../../../../entities/groups";
import { customizeDateToYYYYMMDDFormat } from "../../../../shared/functions/getDateInYYYYMMDDFormat";

export default function GroupTalks(props: {
    handleOpenTalkMessages: (groupId: number) => void,
    handeOpenTalkCreation: () => void,
    groupId: number,
    groupTalks: IGroupTalk[]
}) {
    
    return (
        <div className={s.groupTalks}>
            <div className={s.createTalk} onClick={props.handeOpenTalkCreation}>Начать обсуждение</div>
            <div className={s.talksList}>
                {
                    props.groupTalks?.map(el => (
                        <div 
                            className={s.talk} 
                            onClick={() => props.handleOpenTalkMessages(el.id)} 
                            key={el.id}
                        >
                            <div className={s.title}>{el.title}</div>
                            <div className={s.info}>
                                <div className={s.time}>{customizeDateToYYYYMMDDFormat(String(el.dateOfCreation))}</div>
                                <div className={s.lastMessage}>
                                    Последнее сообщение от 
                                    <Link href='/profile/333'> @333</Link>
                                </div>
                                <div className={s.count}>{el.messages.length} сообщений</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}