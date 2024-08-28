import { IGroup } from "../../../../../global/interfaces/groups";
import { baseURL } from "../../../../../global/store/store";
import s from "./GroupsListView.module.scss";

export default function GroupsListView (props: {
    groupsList: IGroup[],
    handleJoinToGroup: (groupId: IGroup) => void,
    handleGoToCheckGroup: (groupId: number) => void,
    handleCrateNewGroup: () => void
}) {
    return (
        <div className={s.groupsListView}>
            <div className={s.groupsFilters}>
                <span className={s.option} onClick={props.handleCrateNewGroup}>Создать сообщество</span>
            </div>
            <div className={s.groupsContent}>
                <div className={s.list}>
                    {
                        props.groupsList?.map(el => (
                            <div className={s.group} key={el.groupId}>
                                <div className={s.image}>
                                    <img 
                                        src={baseURL + el.mainAvatar}
                                    />
                                </div>
                                <div className={s.info}>
                                    <div className={s.name}>{el.name}</div>
                                    <div className={s.type}>Рисование, искусство, живопись</div>
                                    <div className={s.followers}> 
                                        <span>Участников: {el.membersId.length}</span>
                                        <div className={s.actions}>
                                            <button
                                                onClick={() => props.handleJoinToGroup(el)}    
                                            >Присоединиться</button>
                                            |
                                            <button
                                                onClick={() => props.handleGoToCheckGroup(el.groupId)} 
                                            >Перейти</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}