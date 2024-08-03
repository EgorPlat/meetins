import { useEffect, useRef, useState } from 'react';
import { $user, peerIDForCall, setIsVideoCallOpened, setPeerIDForCall } from '../../store/store';
import { connection } from '../../store/connection_model';
import { useStore } from 'effector-react';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import Peer, { MediaConnection } from 'peerjs';
import s from './VideoCallModal.module.scss';

interface IVideoCallModalProps {
    isOpen: boolean,
}

export default function VideoCallModal({ isOpen }: IVideoCallModalProps) {

    const [peer, setPeer] = useState<Peer>(null);

    const myStream = useRef<HTMLVideoElement>(null);
    const commingStream = useRef<HTMLVideoElement>(null);

    const peerIDForCall$ = useStore(peerIDForCall);
    const connection$ = useStore(connection);
    const authedUser$ = useStore($user);

    const handleConfirmVideoCall = () => {
        
    };

    const handleCallClose = () => { 
        setIsVideoCallOpened(false);
    };

    function handleCallToUser() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream: MediaStream) {
            if (peerIDForCall$) {
                const newPeerCall = peer.call(peerIDForCall$, mediaStream);
                newPeerCall.on('stream', function (remoteStream) {
                    if (commingStream && commingStream.current) {
                        commingStream.current.srcObject = remoteStream;
                        commingStream.current.onloadedmetadata = function(e) {
                            commingStream.current.play();
                        }
                    };
                });
                newPeerCall.on('close', handleCallClose);				  
                if (myStream && myStream.current) {
                    myStream.current.srcObject = mediaStream;
                    myStream.current.onloadedmetadata = function(e) {
                        myStream.current.play();
                    };
                }
            }
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }
  
    const handleAcceptCallFromUser = (peerCall: MediaConnection) => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream: MediaStream) {  
            peerCall.answer(mediaStream);
            if (myStream && myStream.current) {
                myStream.current.srcObject = mediaStream;
                myStream.current.onloadedmetadata = function(e) {
                    myStream.current.play();
                };
            }
            peerCall.on('close', handleCallClose);
            peerCall.on('stream', (remoteStream) => {
                if (commingStream && commingStream.current) {
                    commingStream.current.srcObject = remoteStream;
                    commingStream.current.onloadedmetadata = function(e) {
                        commingStream.current.play();
                    };
                }
            })
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }

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
            newPeer.on('call', function(call) {
                setIsVideoCallOpened(true);
                handleAcceptCallFromUser(call);
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
            typeOfActions='default'
        >
            <div className={s.videoCallModal}>
                <video ref={myStream} muted width="200px" height="200px"></video>
                <video ref={commingStream} width="200px" height="200px"></video>
            </div>
        </CustomModal>
    )
}