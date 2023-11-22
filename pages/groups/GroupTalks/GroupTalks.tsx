import Link from 'next/link';
import s from './GroupTalks.module.scss';
import { IGroupTalk } from '../../../global/interfaces/groups';
import { customizeDateToYYYYMMDDFormat } from '../../../global/helpers/helper';
import { useEffect, useState } from 'react';
import { getGroupTalksList } from '../../../global/store/groups_model';

export default function GroupTalks(props: {
    handleOpenTalkMessages: (groupId: number) => void,
    handeOpenTalkCreation: () => void,
    groupId: number,
}) {

    const [talks, setTalks] = useState<IGroupTalk[]>([]);

    useEffect(() => {
        getGroupTalksList(props.groupId).then(res => {
            setTalks(res.data);
        });
    }, []);

    return (
        <div className={s.groupTalks}>
            <div className={s.createTalk} onClick={props.handeOpenTalkCreation}>Начать обсуждение</div>
            <div className={s.talksList}>
                {
                    talks?.map(el => (
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