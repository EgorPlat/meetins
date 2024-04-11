import { useEffect, useState } from 'react';
import { customizeDateToInputFormatFromDBFormat } from '../../../../global/helpers/helper';
import { IGroupTalkMessage } from '../../../../global/interfaces/groups';
import { baseURL } from '../../../../global/store/store';
import s from './GroupTalksMessagesView.module.scss';
import { activeGroupTalksMessages, getGroupTalkMessageByTalkId, setActiveGroupTalkMessage } from '../../../../global/store/groups_model';
import { useStore } from 'effector-react';

export default function GroupTalksMessagesView(props: {
    talkId: number,
    groupId: number
}) {
    const activeGroupTalksMessages$ = useStore(activeGroupTalksMessages);
    
    useEffect(() => {
        getGroupTalkMessageByTalkId({
            groupId: props.groupId,
            talkId: props.talkId
        }).then(res => {
            setActiveGroupTalkMessage(res.data);
        })
    }, [])
    return (
        <div className={s.groupTalksMessagesView}>
            {
                activeGroupTalksMessages$?.length !== 0
                    ? activeGroupTalksMessages$.map(el => (
                        <div className={s.talkMessage} key={String(el.date)}>
                            <div className={s.senderAvatar}>
                                <img src={baseURL + 'no-avatar.jpg'} width="50px" height="50px" />
                            </div>
                            <div className={s.senderContent}>
                                <div className={s.senderName}>
                                    {el.userId}
                                    <span className={s.sendAt}>{customizeDateToInputFormatFromDBFormat(String(el.date))}</span>
                                </div>
                                <div className={s.senderText}>
                                    {el.text}
                                </div>  
                            </div>
                        </div>
                    ))
                    : <div className={s.noTalksMessage}>Напишите что-то первым...</div>
            }
        </div>
    )
}