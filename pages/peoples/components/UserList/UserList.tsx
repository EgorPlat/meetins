import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";
import { findUserInOnlineList } from "../../../../global/helpers/helper";
import { IPeople } from "../../../../global/interfaces";
import { $onlineUsers, baseURL } from "../../../../global/store/store";
import s from "./UserList.module.scss";

export default function UserList(props: {user: IPeople}): JSX.Element {

    const router = useRouter();
    const userOnlineList = useStore($onlineUsers);

    const goToProfile = (user: IPeople) => {
        router.push(`profile/${user.login}`)
    }
    
    return( 
        <div className={s.user} onClick={() => goToProfile(props.user)}>
            <div className={s.image} style={{backgroundImage: `url(${baseURL + props.user?.userAvatar})`}}>
                {findUserInOnlineList(props.user?.email, userOnlineList) &&
                    <div className={s.round}></div>
                }
            </div>
            <div className={s.name}>
                <h5>{props.user?.userName + ", " + props.user?.age}</h5>
                <h5 className={s.town}>г.{props.user?.city}</h5>
            </div>
        </div>
    )
}