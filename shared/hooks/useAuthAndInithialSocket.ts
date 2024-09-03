import { useEffect } from "react"
import { io } from "socket.io-client";
import { $user, baseURL } from "../../global/store/store";
import { useRouter } from "next/router";
import { useUnit } from "effector-react";
import { connection, setNewConnection } from "../../global/store/connection_model";

export const useAuthAndInithialSocket = () => {

    const socketConnection = useUnit(connection);
    const router = useRouter();
    const authedUser$ = useUnit($user);

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