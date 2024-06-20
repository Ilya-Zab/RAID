"use client"

import { DeepAR } from "deepar";
import EventEmitter from "events";
import { setTimeout } from "timers";

class CustomEventTarget<T extends string> extends EventTarget {
    public override addEventListener(type: T, callback: EventListenerOrEventListenerObject): void {
        super.addEventListener(type, callback);
    }

    public override removeEventListener(type: T, callback: EventListenerOrEventListenerObject): void {
        super.removeEventListener(type, callback)
    }

    public invoke(type: T): boolean {
        return super.dispatchEvent(new Event(type));
    }
}

interface CreativeRecorderServiceOptions {
    deepAR: DeepAR,
    firstPartTimeSeconds: number,
    secondPartTimeSeconds: number
}

export type CreativeRecorderEventNames = "recordingStarted" | "recordingFinished" | "effectChanged";

export class CreativeRecorderService {
    private _options: CreativeRecorderServiceOptions;
    private _recordingTimerId: number = 0;
    private _recordedVideo: Blob | null = null;
    private _isRecording: boolean = false;

    public readonly events: CustomEventTarget<CreativeRecorderEventNames> = new CustomEventTarget();
    
    constructor(options: CreativeRecorderServiceOptions) {
        this._options = options;
    }

    public dispose(): void {
        clearTimeout(this._recordingTimerId);
    }

    public async startRecording(): Promise<void> {
        if (this._isRecording) return; 

        await this._options.deepAR?.startVideoRecording({
            recordAudio: true
        });
        this._isRecording = true;
        this._recordingTimerId = setTimeout(this.recordingTimeExpiredCallback.bind(this), (this._options.firstPartTimeSeconds + this._options.secondPartTimeSeconds) * 1000) as any as number;
        this.events.invoke("recordingStarted");
    }

    public async finishRecording(): Promise<void> {
        if (!this._isRecording) return;

        this._recordedVideo = await this._options.deepAR?.finishVideoRecording();
        this._isRecording = false;
        clearTimeout(this._recordingTimerId);
        this.events.invoke("recordingFinished");
    }

    public async changeEffect(effectUrl: string): Promise<void> {
        await this._options.deepAR.switchEffect(effectUrl);
        this.events.invoke("effectChanged");
    }

    public getVideo(): Blob | null {
        return this._recordedVideo;
    }

    public getIsRecording(): boolean {
        return this._isRecording;
    }

    private async recordingTimeExpiredCallback() {
        await this.finishRecording();
    }
}
