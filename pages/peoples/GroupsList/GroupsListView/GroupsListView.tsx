import { IGroup } from '../../../../global/interfaces/groups';
import { baseURL } from '../../../../global/store/store';
import s from './GroupsListView.module.scss';

export default function GroupsListView (props: {
    groupsList: IGroup[],
    handleGoToGroup: (groupId: IGroup) => void
}) {
    return (
        <div className={s.groupsListView}>
            <div className={s.groupsFilters}>
                <div className={s.title}>
                    Сообщества подобраны исходя из настроек Вашего профиля и интересов.
                </div>
                <span className={s.option}>Создать сообщество</span>
                <span className={s.option}>Мои Сообщества</span>
            </div>
            <div className={s.groupsContent}>
                <div className={s.list}>
                    {
                        props.groupsList?.map(el => (
                            <div className={s.group} key={el.groupId}>
                                <div className={s.image}>
                                    <img 
                                        src={baseURL + el.mainAvatar}
                                        width="80px"
                                        height="80px"
                                    />
                                </div>
                                <div className={s.info}>
                                    <div className={s.name}>{el.name}</div>
                                    <div className={s.type}>Рисование, искусство, живопись</div>
                                    <div className={s.followers}>Участников: 
                                        <span style={{color: 'gray'}}> {el.membersId.length}</span>
                                    </div>
                                </div>
                                <div className={s.actions}>
                                    <button
                                        onClick={() => props.handleGoToGroup(el)}    
                                    >Присоединиться</button>
                                    <button>Перейти</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}