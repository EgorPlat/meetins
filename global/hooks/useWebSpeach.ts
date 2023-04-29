import { useRouter } from "next/router";
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useWebSpeach = () => {

    const { transcript, resetTranscript } = useSpeechRecognition();
    const router = useRouter();
    
    useEffect(() => {
        console.log(transcript);
        
        if (transcript.split(' ').includes('регистрация')) {
            router.push('/register');
            resetTranscript();
        }
        if (transcript.split(' ').includes('вход')) {
            router.push('/login');
            resetTranscript();
        }
    }, [transcript]);

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });

        return () => {
            SpeechRecognition.stopListening();
        }
    }, [])
}