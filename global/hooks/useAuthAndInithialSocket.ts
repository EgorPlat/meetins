import { useEffect, useState } from "react"
import { io } from "socket.io-client";
import { baseURL, getInitialUserDataAndCheckAuth } from "../store/store";
import { useRouter } from "next/router";
import { setRouter } from "../store/router_model";
import { useStore } from "effector-react";
import { connection, setNewConnection } from "../store/connection_model";

export const useAuthAndInithialSocket = () => {

    const socketConnection = useStore(connection);
	const router = useRouter();
    
    useEffect(() => {
		setRouter(router);
		getInitialUserDataAndCheckAuth();
    }, []);

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
	}, [router.asPath]);

	return socketConnection !== null;
}