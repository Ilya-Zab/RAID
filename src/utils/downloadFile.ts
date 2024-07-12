// provides functionality to download videos and audios.
// created for test purposes
export function downloadFile(fileContent: Blob, fileName: string) {
    const url = URL.createObjectURL(fileContent);
    const a: any = document.createElement("a");

    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
