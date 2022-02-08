import React from "react";
import s from "./userChatCard.module.scss";

export default function UserChatCard(props: {user: IChatUser}): JSX.Element {
    return(
        <div>

        </div>
    )
}
export interface IChatUser {
    firstName: string,
    lastName: string,
    avatar: string,
    lastMessage: string
}