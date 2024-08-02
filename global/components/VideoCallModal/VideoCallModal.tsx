import { useEffect, useRef, useState } from 'react';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import s from './VideoCallModal.module.scss';
import Peer from 'peerjs';
import { setIsVideoCallOpened } from '../../store/store';

interface IVideoCallModalProps {
    isOpen: boolean,
    handleChangeModal: (status: boolean) => void,
}

export default function VideoCallModal({ isOpen, handleChangeModal }: IVideoCallModalProps) {

    const [peerCall, setPeerCall] = useState(null);
    const myStream = useRef<HTMLVideoElement>(null);
    const commingStream = useRef<HTMLVideoElement>(null);
    const peerIDRef = useRef<HTMLInputElement>(null);
    const [peer, setPeer] = useState<Peer>(null);

    const handleConfirmVideoCall = () => {

    };

    const handleEnterClick = (e) => {
        if (e.code === 'Enter') {
            callToNode();
        }
    };

    const handleCallClose = () => {
        setIsVideoCallOpened(false);
    }

    function callToNode() { //вызов
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream) {
            if (peerIDRef && peerIDRef.current) {
                const newPeerCall = peer.call(peerIDRef.current.value, mediaStream); //звоним, указав peerId-партнера и передав свой mediaStream
                newPeerCall.on('stream', function (stream) { //нам ответили, получим стрим
                    setTimeout(function() {
                            if (commingStream && commingStream.current) {
                                commingStream.current.srcObject = newPeerCall.remoteStream;
                                commingStream.current.onloadedmetadata= function(e) {
                                commingStream.current.play();
                            }
                        };
                    }, 1500);	
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
  
    const callAnswer = (peerCall) => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(mediaStream) {	    				  
            peerCall.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
            //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
            myStream.current.srcObject = mediaStream; //помещаем собственный медиапоток в объект видео (чтоб видеть себя)
            if (myStream && myStream.current) {
                myStream.current.onloadedmetadata = function(e) {
                    myStream.current.play();
                };
            }
            setTimeout(function() {
                //входящий стрим помещаем в объект видео для отображения
                // и запускаем воспроизведение когда объект загружен
                if (commingStream && commingStream.current) {
                    commingStream.current.srcObject = peerCall.remoteStream;
                    commingStream.current.onloadedmetadata = function(e) {
                        commingStream.current.play();
                    };
                }
            }, 1500);			  				  
                      
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }

    useEffect(() => {
        const newPeer = new Peer();
        newPeer.on('open', function(peerID) {
			console.log(peerID);	
		});
        newPeer.on('call', function(call) {
            // Answer the call, providing our mediaStream
            setPeerCall(() => call);
            callAnswer(call);
        });
        setPeer(newPeer);
        //callToNode();
    }, [])

    return (
        <CustomModal
            title='Видеозвонок'
            isDisplay={isOpen}
            changeModal={handleChangeModal}
            actionConfirmed={handleConfirmVideoCall}
            typeOfActions='default'
        >
            <div className={s.videoCallModal}>
                <input ref={peerIDRef} onKeyDown={handleEnterClick} />
                <video ref={myStream} width="200px" height="200px"></video>
                <video ref={commingStream} width="200px" height="200px"></video>
            </div>
        </CustomModal>
    )
}