import { useEffect } from "react"
import { io } from "socket.io-client";
import { $user, baseURL } from "../store/store";
import { useRouter } from "next/router";
import { useStore } from "effector-react";
import { connection, setNewConnection } from "../store/connection_model";

export const useAuthAndInithialSocket = () => {

    const socketConnection = useStore(connection);
    const router = useRouter();
    const authedUser$ = useStore($user);

    useEffect(() => {
        if (authedUser$ && socketConnection === null) {
            try {
                const newConnection = io(baseURL, {
                    transports: ["websocket", "polling"]
                });
                setNewConnection(newConnection);
            } catch (err) {
                setNewConnection(null);
            }
        }
    }, [authedUser$]);

    return socketConnection !== null;
}