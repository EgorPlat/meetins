import { useEffect } from "react"
import { io } from "socket.io-client";
import { baseURL } from "../store/store";
import { useRouter } from "next/router";
import { useStore } from "effector-react";
import { connection, setNewConnection } from "../store/connection_model";

export const useAuthAndInithialSocket = () => {

    const socketConnection = useStore(connection);
	const router = useRouter();
	const isNeededRoutes = router.asPath !== "/login" && router.asPath !== "/register" && router.asPath !== '';

	useEffect(() => {
		if (isNeededRoutes && socketConnection === null) {
			try {
				const newConnection = io(baseURL, {
					transports: ['websocket', 'polling']
				});
				setNewConnection(newConnection);
			} catch (err) {
				setNewConnection(null);
			}
		}
	}, [router.asPath]);

	return socketConnection !== null;
}