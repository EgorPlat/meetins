import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";
import useDebounce from "../../../global/hooks/useDebounce";
import { IPeople } from "../../../global/interfaces";
import { $onlineUsers, baseURL } from "../../../global/store/store";
import s from "./UserList.module.scss";

export default function UserList(props: {user: IPeople}): JSX.Element {

    const router = useRouter();
    const userOnlineList = useDebounce(useStore($onlineUsers), 3000);

    const goToProfile = (user: IPeople) => {
        router.push(`profile/${user.login}`)
    }
    
    return( 
        <div className={s.user} onClick={() => goToProfile(props.user)}>
            <div className={s.image} style={{backgroundImage: `url(${baseURL + props.user?.userAvatar})`}}>
                {userOnlineList.indexOf(props.user?.email) > -1 &&
                    <div className={s.round}></div>
                }
            </div>
            <div className={s.name}>
                <h5>{props.user?.userName + ", " + props.user?.age}</h5>
            </div>
        </div>
    )
}