import { baseURL } from '../../../global/store/store';
import s from './GroupTalksMessagesView.module.scss';

export default function GroupTalksMessagesView() {
    return (
        <div className={s.groupTalksMessagesView}>
            {
                [1,2,3,4,5].map(el => (
                    <div className={s.talkMessage}>
                        <div className={s.senderAvatar}>
                            <img src={baseURL + 'no-avatar.jpg'} width="50px" height="50px" />
                        </div>
                        <div className={s.senderContent}>
                            <div className={s.senderName}>
                                Егор <span className={s.sendAt}>2023-10-10</span>
                            </div>
                            <div className={s.senderText}>
                                Отличное сообщество, в котором состоит множество талантливых и интересных людей.
                            </div>  
                        </div>
                    </div>
                ))
            }
        </div>
    )
}