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
			if(localStorage.getItem('access-token') !== '') {
				const newConnection = io(baseURL, {
					extraHeaders: {
						Authorization: String(localStorage.getItem('access-token'))
					}
				});
				setNewConnection(newConnection);
			} else {
				setNewConnection(null);
			}
		}
	}, [router]);

	return socketConnection !== null;
}