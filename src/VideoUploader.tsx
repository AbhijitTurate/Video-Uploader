import { useState } from 'react';
import "./components/uploader/VideoUploader.css"
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
        <div className='video-uploader-wrapper'>
            <h1>Upload Files</h1>

            {/* <input type="file" multiple onChange={(e) => setFiles(e.target.files)} accept=".mov,.mp4" /> */}
            <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                accept=".mov,.mp4"
            />

            {/* <button onClick={handleUpload}>Upload</button> */}
            <button className="btn btn-outline btn-primary" onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default VideoUploader