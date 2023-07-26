import { useEffect } from "react"
import { io } from "socket.io-client";
import { baseURL } from "../store/store";
import { useRouter } from "next/router";
import { useStore } from "effector-react";
import { connection, setNewConnection } from "../store/connection_model";

export const useAuthAndInithialSocket = () => {

    const socketConnection = useStore(connection);
	const router = useRouter();

	useEffect(() => {
		if (socketConnection === null) {
			try {
				const newConnection = io(baseURL, {
					extraHeaders: {
						Authorization: String(localStorage.getItem('access-token')),
					},
					transports: ['websocket', 'polling']
				});
				setNewConnection(newConnection);
			} catch (err) {
				setNewConnection(null);
			}
		}
	}, [router]);

	return socketConnection !== null;
}