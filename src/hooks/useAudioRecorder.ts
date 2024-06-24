"use client"

import { useRef, useState } from "react";

export type AudioRecorderResult = {
    startRecording: () => Promise<void>,
    finishRecording: () => void,
    getPermissions: () => Promise<boolean>,
    isRecording: boolean,
    audio: Blob | null
};

export default function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audio, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    async function startRecording() {
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

    async function finishRecording() {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }

    async function getPermissions(): Promise<boolean> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        }
        catch {
            return false;
        }
    }

    return { startRecording, finishRecording, getPermissions, recording: isRecording, audio };
}
