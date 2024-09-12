import { useState } from "react";

interface IUserMediaProps {
    video: boolean | { width: number, height: number },
    audio: boolean,
    htmlElementIdForStopMedia: string
}

export const useUserMediaTracks = ({ 
    video, 
    audio, 
    htmlElementIdForStopMedia
}: IUserMediaProps
) => {

    const [currentMediaChunks, setCurrentMediaChunks] = useState<Blob[]>();

    const activateMedia = (onActivate: (stream: MediaStream) => any) => {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio }).then(function(currentStream) {
            const mediaRecorder = new MediaRecorder(currentStream);
            const mediaChunks: Blob[] = [];
            mediaRecorder.start();
            mediaRecorder.ondataavailable = (e: BlobEvent) => {
                const blob: Blob = e.data;
                mediaChunks.push(blob);
            }
            onActivate(currentStream);

            document.getElementById(htmlElementIdForStopMedia)?.addEventListener("click", () => {
                currentStream.getTracks().forEach(function(track) {
                    track.stop();
                });
                mediaRecorder.stop();
            });
            mediaRecorder.onstop = () => {
                setCurrentMediaChunks(mediaChunks);
            }
        });
    }

    return { handleActivateMedia: activateMedia, mediaChunks: currentMediaChunks }
}