import { useEffect, useState } from "react"
import { io } from "socket.io-client";
import { baseURL, getInitialUserDataAndCheckAuth } from "../store/store";
import { useRouter } from "next/router";
import { setRouter } from "../store/router_model";

export const useAuthAndInithialSocket = () => {

    const [socketConnection, setSocketConnection] = useState(null);
	const router = useRouter();
    
    useEffect(() => {
        setRouter(router);
        getInitialUserDataAndCheckAuth();
        if(localStorage.getItem('access-token') !== '') {
			const newConnection = io(baseURL, {
				extraHeaders: {
					Authorization: String(localStorage.getItem('access-token'))
				}
			});
		    setSocketConnection(newConnection);
		} else {
			if (router.asPath !== '/confirmation') {
				router.push('/register');
			}
		}
    }, []);

    return socketConnection;
}