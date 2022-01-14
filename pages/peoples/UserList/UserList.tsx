import { useRouter } from "next/router";
import React from "react";
import { baseURL } from "../../../global/store/store";
import { IShortUser } from "../../../global/store/users_model";
import s from "./UserList.module.scss";

export default function UserList(props: {user: IShortUser}): JSX.Element {

    const router = useRouter();

    const goToProfile = (user: IShortUser) => {
        router.push(`profile/${user.loginUrl}`)
    }
    return( 
        <div className={s.user} onClick={() => goToProfile(props.user)}>
            <div className={s.image} style={{backgroundImage: `url(${baseURL + props.user?.avatarPath})`}}>
                <div className={s.round}>
                        
                </div>
            </div>
            <div className={s.name}>
                <h5>{props.user?.firstName}</h5>
            </div>
        </div>
    )
}