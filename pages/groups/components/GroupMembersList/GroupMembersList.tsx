import { useRouter } from "next/router";
import { IGroupMembersInfo } from "../../../../entities/groups";
import { baseURL } from "../../../../global/store/store";
import s from "./GroupMembersList.module.scss";

interface IGroupMembersListProps {
    members: IGroupMembersInfo[]
}

export default function GroupMembersList(props: IGroupMembersListProps) {

    const router = useRouter();

    return (
        <div className={s.groupMembersList}>
            {
                props.members.map(member => {
                    return (
                        <div className={s.wrapper} onClick={() => router.push(`/profile/${member.login}`)}>
                            <img src={baseURL + member.avatar} className={s.avatar} />
                            <div className={s.name}>{member.name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}