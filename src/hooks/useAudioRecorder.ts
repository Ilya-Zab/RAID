"use client"

import { useRef, useState } from "react";

export type AudioRecorderResult = { startAudioRecording: () => Promise<void>, finishAudioRecording: () => void, isRecording: boolean, audio: Blob | null };

export default function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audio, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    async function startAudioRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            chunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
            setAudioBlob(blob);
            chunksRef.current = [];
        };

        mediaRecorder.start();
        setIsRecording(true);
    };

    async function finishAudioRecording() {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }

    return { startAudioRecording, finishAudioRecording, recording: isRecording, audio };
}
