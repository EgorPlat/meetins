import { useEffect, useRef, useState } from 'react';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import s from './VideoCallModal.module.scss';
import Peer from 'peerjs';
import { $user, peerIDForCall, setIsVideoCallOpened, setPeerIDForCall } from '../../store/store';
import { connection } from '../../store/connection_model';
import { useStore } from 'effector-react';

interface IVideoCallModalProps {
    isOpen: boolean,
    handleChangeModal: (status: boolean) => void,
}

export default function VideoCallModal({ isOpen, handleChangeModal }: IVideoCallModalProps) {

    const [peerCall, setPeerCall] = useState(null);
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
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream) {
            if (peerIDForCall$) {
                const newPeerCall = peer.call(peerIDForCall$, mediaStream);
                newPeerCall.on('stream', function (stream) {
                    //setTimeout(function() {
                            if (commingStream && commingStream.current) {
                                commingStream.current.srcObject = newPeerCall.remoteStream;
                                commingStream.current.onloadedmetadata= function(e) {
                                commingStream.current.play();
                            }
                        };
                    //}, 1500);
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
  
    const handleAcceptCallFromUser = (peerCall) => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream) {	    				  
            /*peerCall.answer(mediaStream);
            myStream.current.srcObject = mediaStream;
            if (myStream && myStream.current) {
                myStream.current.onloadedmetadata = function(e) {
                    myStream.current.play();
                };
            }
            peerCall.on('close', handleCallClose);
            //setTimeout(function() {
                if (commingStream && commingStream.current) {
                    commingStream.current.srcObject = peerCall.remoteStream;
                    commingStream.current.onloadedmetadata = function(e) {
                        commingStream.current.play();
                    };
                }
            //}, 1500);*/
            const peerAnswer = peerCall.answer(mediaStream);
            myStream.current.srcObject = mediaStream;
            if (myStream && myStream.current) {
                myStream.current.onloadedmetadata = function(e) {
                    myStream.current.play();
                };
            }
            peerCall.on('close', handleCallClose);
            setTimeout(function() {
                peerAnswer.on('stream', () => {
                    if (commingStream && commingStream.current) {
                        commingStream.current.srcObject = peerCall.remoteStream;
                        commingStream.current.onloadedmetadata = function(e) {
                            commingStream.current.play();
                        };
                    }
                })
                
            }, 500);		  				  
                      
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }

    useEffect(() => {
        if (isOpen === false) {
            setPeerIDForCall(null);
            setPeerCall(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (connection$) {
            const newPeer = new Peer();
            newPeer.on('open', function(peerID) {
                connection$?.emit('send-peer-id', { userId: authedUser$.userId, peerID: peerID })
            });
            newPeer.on('call', function(call) {
                setPeerCall(() => call);
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
            changeModal={() => handleChangeModal(false)}
            actionConfirmed={handleConfirmVideoCall}
            typeOfActions='default'
        >
            <div className={s.videoCallModal}>
                <video ref={myStream} width="200px" height="200px"></video>
                <video ref={commingStream} width="200px" height="200px"></video>
            </div>
        </CustomModal>
    )
}