import { useEffect } from "react";

export const useBlockBodyScroll = (isBlockNeeded: boolean) => {

    useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		if (isBlockNeeded) {
			body.style.overflowY = 'hidden';
		} else {
			body.style.overflowY = 'scroll';
		}
	}, [isBlockNeeded]);

};
