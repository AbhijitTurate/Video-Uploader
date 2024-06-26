import { useState } from 'react';
import "./VideoUploader.css"

const VideoUploader = () => {
    const [files, setFiles] = useState<any>([]); // Add type annotation to the state
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(0);
    console.log("resp---- ", response);

    const dummyCall = async () => {
        try {
            setLoading(30);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setLoading(40);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setLoading(70);
            const responseData = await response.json();
            setResponse(responseData.title + " " + responseData.body);
            console.log("Successfully posted : ", responseData);
            setLoading(100);
        }
        catch (error) {
            setLoading(100);
            console.log("Error posting : ", error);
        }
    }

    const postCall = async (formData: any) => {
        try {
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            }).then((res) => {
                console.log('res:::', res);
            }).catch((err) => {
                console.log('err:::', err);
            });
        }
        catch (error) {
            console.log("Error posting video : ", error);

        }
    }
    const handleUpload = async () => {
        const formData = new FormData();

        for (const file of files) {
            formData.append("files", file);
        }

        await dummyCall();

        return;

        postCall(formData);
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

            {loading > 0 && loading !== 100 && (
                <progress className="progress w-70" value={loading} max="100"></progress>
            )}

            {response.length > 0 && (
                <textarea className="textarea textarea-primary">{response}</textarea>
            )}
        </div>
    )
}

export default VideoUploader