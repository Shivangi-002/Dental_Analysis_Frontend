import React, { useState } from "react";

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [lesionImage, setLesionImage] = useState(null);
    const [restorationImage, setRestorationImage] = useState(null);
    const [implantImage, setImplantImage] = useState(null);
    const API_URL = "https://dental-analysis-backend.onrender.com";

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`${API_URL}/upload/`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            // Update image sources
            setLesionImage(`${API_URL}${data.lesion_image}`);
            setRestorationImage(`${API_URL}${data.restoration_image}`);
            setImplantImage(`${API_URL}${data.implant_image}`);
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Dental X-ray Analysis</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Analyze</button>

            {lesionImage && <img src={lesionImage} alt="Lesion Analysis" style={{ width: "300px" }} />}
            {restorationImage && <img src={restorationImage} alt="Restoration Analysis" style={{ width: "300px" }} />}
            {implantImage && <img src={implantImage} alt="Implant Analysis" style={{ width: "300px" }} />}
        </div>
    );
};

export default App;
