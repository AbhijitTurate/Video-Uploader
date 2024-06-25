import { useState } from 'react';

const VideoUploader = () => {
    const [files, setFiles] = useState<any>([]); // Add type annotation to the state

    const handleUpload = () => {
        const formData = new FormData();
        for (const file of files) {
            formData.append("files", file);
          }
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        }).then((res) => {
            console.log('res:::', res);
        }).catch((err) => {
            console.log('err:::', err);
        });
    }
    return (
        <>
            <h1>Upload Files</h1>
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)}  accept=".mov,.mp4"/> 
            <button onClick={handleUpload}>Upload</button>
        </>
    )
}

export default VideoUploader