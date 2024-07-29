import useDeepAR from "@/hooks/useDeepAR";
import { downloadFile } from "@/utils/downloadFile";
import { useState } from "react";

const deeparScreen = {
    height: "600px",
    width: "600px"
};

export default function TestPhoto() {
    const deepAR = useDeepAR("#deepar-screen", "effects/ORC_BG+ORC_HEAD.deepar");
    
    async function handleClick() {
        const dataUrl = await deepAR.takeScreenshot();
        const blob = convertDataUrlToBlob(dataUrl);
        downloadFile(blob, "photo.png");
    }

    return (
        <div>
            <h1>Create photo now!</h1>

            <button onClick={handleClick}>Create a photo!</button>

            <div style={deeparScreen} id="deepar-screen"></div>
        </div>
    );
}

// converts media from data URL to the Blob format
function convertDataUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], {type:mime});
}
