import { useEffect, useRef, useState } from 'react';
import { $user, peerIDForCall, setIsVideoCallOpened, setPeerIDForCall } from '../../store/store';
import { connection } from '../../store/connection_model';
import { useStore } from 'effector-react';
import { FaCamera, FaMicrophone } from 'react-icons/fa6';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import Peer, { MediaConnection } from 'peerjs';
import s from './VideoCallModal.module.scss';

interface IVideoCallModalProps {
    isOpen: boolean,
}

export default function VideoCallModal({ isOpen }: IVideoCallModalProps) {

    const [peer, setPeer] = useState<Peer>(null);
    const [peerCall, setPeerCall] = useState<MediaConnection>(null);
    const [isUserAcceptedCall, setIsUserAcceptedCall] = useState<boolean>(false);
    const [isMediaActive, setIsMediaActive] = useState<{ video: boolean, audio: boolean }>({ video: true, audio: true });

    const myStreamRef = useRef<HTMLVideoElement>(null);
    const commingStreamRef = useRef<HTMLVideoElement>(null);
    const myMediaDeviceStream = useRef<MediaStream>(null);

    const peerIDForCall$ = useStore(peerIDForCall);
    const connection$ = useStore(connection);
    const authedUser$ = useStore($user);

    const handleConfirmVideoCall = () => {
        
    };

    const handleCloseAllLocalMediaTracks = () => {
        if (myMediaDeviceStream && myMediaDeviceStream.current) {
            myMediaDeviceStream.current.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    };

    const handleCallClose = () => {
        handleCloseAllLocalMediaTracks();
        if (peerCall) {
            peerCall.close();
        }
        setIsMediaActive({ video: true, audio: true });
    };

    const handleCloseVideoModal = () => {
        setIsMediaActive({ video: true, audio: true });
        setIsVideoCallOpened(false);
        setIsUserAcceptedCall(false);
        handleCloseAllLocalMediaTracks();
    };

    const handleSwapMediaStatus = (audio: boolean, video: boolean) => {
        handleCloseAllLocalMediaTracks();
        setIsMediaActive(() => {
            return { audio, video };
        });
        navigator.mediaDevices.getUserMedia({ 
            audio: isMediaActive.audio, 
            video: isMediaActive.video ? { width: 200, height: 200 } : false
        }).then((stream) => {
            peerCall.peerConnection.getSenders().forEach((sender: RTCRtpSender) => {
                if(sender.track.kind === "audio" && stream.getAudioTracks().length > 0){
                    sender.replaceTrack(stream.getAudioTracks()[0]);
                }
                if (sender.track.kind === "video" && stream.getVideoTracks().length > 0) {
                    sender.replaceTrack(stream.getVideoTracks()[0]);
                }
            });
            myMediaDeviceStream.current = stream;
            if (myStreamRef && myStreamRef.current) {
                myStreamRef.current.srcObject = stream;
                myStreamRef.current.play();
            }
        });
    };

    function handleCallToUser() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 200, height: 200 } })
            .then(function(mediaStream: MediaStream) {
                if (myMediaDeviceStream) {
                    myMediaDeviceStream.current = mediaStream;
                }
                if (peerIDForCall$) {
                    const newPeerCall = peer.call(peerIDForCall$, mediaStream);
                    setPeerCall(newPeerCall);
                    newPeerCall.on('stream', function (remoteStream) {
                        setIsUserAcceptedCall(true);
                        if (commingStreamRef && commingStreamRef.current) {
                            commingStreamRef.current.srcObject = remoteStream;
                            commingStreamRef.current.onloadedmetadata = function(e) {
                                commingStreamRef.current?.play();
                            }
                        };
                    });

                    newPeerCall.on('close', () => {
                        mediaStream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                        handleCloseVideoModal();
                    });
	  
                    if (myStreamRef && myStreamRef.current) {
                        myStreamRef.current.srcObject = mediaStream;
                        myStreamRef.current.onloadedmetadata = function(e) {
                            myStreamRef.current?.play();
                        };
                    }
                }
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
  
    const handleAcceptCallFromUser = (peerCall: MediaConnection) => {
        setIsUserAcceptedCall(true);
        navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 200, height: 200 } })
            .then(function(mediaStream: MediaStream) {
                if (myMediaDeviceStream) {
                    myMediaDeviceStream.current = mediaStream;
                }
                peerCall.answer(mediaStream);
                setPeerCall(peerCall);
                
                if (myStreamRef && myStreamRef.current) {
                    myStreamRef.current.srcObject = mediaStream;
                    myStreamRef.current.onloadedmetadata = function(e) {
                        myStreamRef.current?.play();
                    };
                }
                peerCall.on('close', () => {
                    mediaStream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                    handleCloseVideoModal();
                });

                peerCall.on('stream', (remoteStream) => {
                    if (commingStreamRef && commingStreamRef.current) {
                        commingStreamRef.current.srcObject = remoteStream;
                        commingStreamRef.current.onloadedmetadata = function(e) {
                            commingStreamRef.current?.play();
                        };
                    }
                })
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
    };

    useEffect(() => {
        if (isOpen === false) {
            setPeerIDForCall(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (connection$) {
            const newPeer: Peer = new Peer();
            newPeer.on('open', function(peerID) {
                connection$?.emit('send-peer-id', { userId: authedUser$.userId, peerID: peerID })
            });
            newPeer.on('call', function(call: MediaConnection) {
                const isUserConfirmedCall = confirm('Входящий звонок от пользователя. Принять?');
                if (isUserConfirmedCall) {
                    setIsVideoCallOpened(true);
                    handleAcceptCallFromUser(call);
                } else {
                    call.close();
                }
            });
            setPeer(newPeer);
        }
    }, [connection$]);

    useEffect(() => {
        if (peerIDForCall$) {
            handleCallToUser();
        }
    }, [peerIDForCall$])

    return (
        <CustomModal
            title='Видеозвонок'
            isDisplay={isOpen}
            changeModal={handleCallClose}
            actionConfirmed={handleConfirmVideoCall}
            typeOfActions='none'
        >
            <div className={s.videoCallModal}>
                <video ref={myStreamRef} muted width="200px" height="200px"></video>
                <video 
                    style={isUserAcceptedCall ? {opacity: 1} : {opacity: 0}} 
                    ref={commingStreamRef} 
                    width="200px" 
                    height="200px"
                ></video>
                {!isUserAcceptedCall && <div className={s.watingMessage}>Ожидание ответа...</div>}
                {isUserAcceptedCall &&
                    <div className={s.actions}>
                        <div 
                            className={s.actionsMicrophone}
                            onClick={() => handleSwapMediaStatus(!isMediaActive.audio, isMediaActive.video)}
                        >
                            <FaMicrophone fontSize={28} color={isMediaActive.audio ? "gray" : "red"} />
                        </div>
                        <div 
                            className={s.actionsCamera}
                            onClick={() => handleSwapMediaStatus(isMediaActive.audio, !isMediaActive.video)}
                        >
                            <FaCamera fontSize={28} color={isMediaActive.video ? "gray" : "red"} />
                        </div>
                    </div>
                }
            </div>
        </CustomModal>
    )
}