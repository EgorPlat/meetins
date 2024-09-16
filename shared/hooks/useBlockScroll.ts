import { useEffect } from "react";

export const useBlockBodyScroll = (isBlockNeeded: boolean) => {

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        if (isBlockNeeded) {
            body.style.overflowY = "hidden";
            if (document.getElementById("mobileMainContent")) {
                document.getElementById("mobileMainContent").style.overflowY = "hidden";
            }
        } else {
            body.style.overflowY = "scroll";
            if (document.getElementById("mobileMainContent")) {
                document.getElementById("mobileMainContent").style.overflowY = "hidden";
            }
        }
    }, [isBlockNeeded]);

};
