import { baseURL } from '../../../global/store/store';
import { CiSquarePlus } from "react-icons/ci";
import s from './MeetingsRoomPageView.module.scss';
import CustomProgressBar from '../../../components-ui/CustomProgressBar/CustomProgressBar';

export default function MeetingsRoomPageView() {

    return (
        <div className={s.meetingsRoom}>
            <div className={s.topContent}>
                <div className={s.mainInfo}>
                    <img 
                        src={baseURL + 'no-avatar.jpg'} 
                        width="150px" 
                        height="150px"
                        className={s.photo}
                    />
                    <div className={s.title}>Прогулка по Москве</div>
                </div>
                <div className={s.moreInfo}>
                    <div className={s.activityBar}>
                        <CustomProgressBar 
                            width='50%'
                            height='30px'
                            max={25}
                            value={17}
                        />
                        <CiSquarePlus
                            className={s.addMember}
                            fontSize={35}
                        />
                    </div>
                    <div className={s.tags}>
                        Цели: 
                    </div>
                    <div className={s.members}>
                        Участники: 
                    </div>
                    <div className={s.dates}>
                        Даты проведения: 
                    </div>
                </div>
            </div>
            <div className={s.bottomContent}>
                <div className={s.mediaInfo}>
                    Фотографии  и видео со встречи
                </div>
                <div className={s.title}>
                    Обсуждение участников
                </div>
                <div className={s.messages}>
                    {
                        Array.from("11111").map(el => (
                            <div className={s.message}>
                                <div className={s.userInfo}>
                                    <img 
                                        src={baseURL + 'no-avatar.jpg'} 
                                        width="40px" 
                                        height="40px"
                                        className={s.avatar}
                                    />
                                    <div className={s.name}>Егор - участник</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}