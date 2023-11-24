import { CgEnter } from 'react-icons/cg';
import { IMeeting } from '../../../../../global/interfaces/meetings';
import { baseURL } from '../../../../../global/store/store';
import s from './FurtherMeetings.module.scss';
import Image from 'next/image';
import { customizeDateToYYYYMMDDFormat } from '../../../../../global/helpers/helper';

export default function FurtherMeetings(props: {
    data: IMeeting[],
    handleGoToMeetingRoom: (meetingId: string) => void
}) {

    return (
        <div className={s.furtherMeetings}>
            <div className={s.meetingsList}>
                {
                    props.data?.map((el) => (
                        <div className={s.meeting} key={el.meetingId} onClick={() => props.handleGoToMeetingRoom(el.meetingId)}>
                            <img src={baseURL + el.preview} width="75px" height="75px" />
                            <div className={s.content}>
                                <div className={s.title}>
                                    {el.title}
                                    <CgEnter fontSize={22} />
                                </div>
                                <div className={s.goals}>
                                    Цели: {el.goal}
                                </div>
                                <div className={s.date}>
                                    Дата: {customizeDateToYYYYMMDDFormat(String(el.date))}
                                </div>
                                <div className={s.address}>
                                    Адрес: {el.address}
                                </div>
                                <div className={s.members}>
                                    Участников: {el.participants.length}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}