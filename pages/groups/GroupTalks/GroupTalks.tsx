import Link from 'next/link';
import s from './GroupTalks.module.scss';

export default function GroupTalks(props: {
    handleOpenTalkMessages: () => void,
    handeOpenTalkCreation: () => void
}) {
    return (
        <div className={s.groupTalks}>
            <div className={s.createTalk} onClick={props.handeOpenTalkCreation}>Начать обсуждение</div>
            <div className={s.talksList}>
                {
                    [1,2,3,4,5,6,7,8].map(el => (
                        <div className={s.talk} onClick={props.handleOpenTalkMessages}>
                            <div className={s.title}>Рейтинг художников сообщества</div>
                            <div className={s.info}>
                                <div className={s.time}>2023-10-06 10:33</div>
                                <div className={s.lastMessage}>
                                    Последнее сообщение от 
                                    <Link href='/profile/333'> @333</Link>
                                </div>
                                <div className={s.count}>10 сообщений</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}