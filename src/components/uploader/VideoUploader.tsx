import { useState } from 'react';
import "./VideoUploader.css"

const VideoUploader = () => {
    const [files, setFiles] = useState<any>([]); // Add type annotation to the state
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(0);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    console.log("resp---- ", response);

    const dummyCall = async () => {
        try {
            setResponse("");
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
            await delay(1000); // 1 second delay

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setLoading(70);
            await delay(1000); // 1 second delay

            const responseData = await response.json();
            // setResponse(responseData.title + " " + responseData.body);
            setResponse(JSON.stringify(responseData).repeat(100));
            console.log("Successfully posted : ", responseData);
            setLoading(100);
            await delay(1000); // 1 second delay
            setLoading(101);
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
            <h1 className="text-4xl font-bold mb-4">Upload Files</h1>

            {/* <input type="file" multiple onChange={(e) => setFiles(e.target.files)} accept=".mov,.mp4" /> */}
            <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs glass"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                accept=".mov,.mp4"
            />

            {/* <button onClick={handleUpload}>Upload</button> */}
            <button className="btn btn-outline btn-primary" onClick={handleUpload}>Upload</button>

            <div className="progress-wrapper response-area">
                {loading > 0 && loading !== 101 && (
                    <progress className="progress" value={loading} max="100"></progress>
                )}
                {response.length > 0  && response}
            </div>

            {/* {response.length > 0 && (
                <>
                <div className="response-area">
                    {response}
                </div>
                </>
            )} */}
        </div>
    )
}

export default VideoUploader