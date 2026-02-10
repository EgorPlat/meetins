import { useEffect, useState } from "react";

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
    const [mediaAvailable, setMediaAvailable] = useState<{
        audio: boolean,
        video: boolean
    }>();

    const activateMedia = (onActivate: (stream: MediaStream) => any) => {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio }).then(function(currentStream) {
            const mediaRecorder = new MediaRecorder(currentStream);
            const mediaChunks: Blob[] = [];
            mediaRecorder.start();
            mediaRecorder.ondataavailable = (e: BlobEvent) => {
                const blob: Blob = e.data;
                mediaChunks.push(blob);
            }
            mediaRecorder.onstop = () => {
                setCurrentMediaChunks(mediaChunks);
                currentStream.getTracks().forEach(track => {
                    track.stop();
                });
                setTimeout(() => {
                    console.log(
                        currentStream.getAudioTracks()[0]?.readyState
                    );
                }, 1000);
            }

            document.getElementById(htmlElementIdForStopMedia)?.addEventListener("click", () => {
                mediaRecorder.stop();
            });
            onActivate(currentStream);
        });
    }

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            setMediaAvailable({ 
                audio: devices.filter(device => device.kind === 'audioinput').length !== 0,
                video: devices.filter(device => device.kind === 'videoinput').length !== 0
            })
        })
    }, []);

    return { 
        handleActivateMedia: activateMedia, 
        mediaChunks: currentMediaChunks,
        mediaAvailable
    }
}