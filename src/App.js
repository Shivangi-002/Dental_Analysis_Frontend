import React, { useState } from "react";

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [lesionImage, setLesionImage] = useState(null);
    const [restorationImage, setRestorationImage] = useState(null);
    const [implantImage, setImplantImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = "https://dental-analysis-backend.onrender.com";

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`${API_URL}/upload/`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            setLesionImage(`${API_URL}${data.lesion_image}`);
            setRestorationImage(`${API_URL}${data.restoration_image}`);
            setImplantImage(`${API_URL}${data.implant_image}`);
        } catch (error) {
            console.error("Error uploading image", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Dental X-ray Analysis</h2>
            <p className="text-gray-600 mb-6">Upload a dental X-ray image for lesion, restoration, and implant detection.</p>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <input
                    type="file"
                    className="w-full border p-2 mb-4"
                    onChange={handleFileChange}
                />

                {selectedFile && (
                    <div className="mt-2">
                        <p className="text-gray-500">Selected File: <strong>{selectedFile.name}</strong></p>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="mt-2 w-full max-h-52 object-cover rounded-md border"
                        />
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition-all duration-300"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Upload & Analyze"}
                </button>
            </div>

            {/* Display Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {lesionImage && (
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold text-red-600">Lesion Detection</h3>
                        <img src={lesionImage} alt="Lesion Analysis" className="w-72 h-auto rounded-md border mt-2" />
                    </div>
                )}

                {restorationImage && (
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold text-yellow-600">Restoration Detection</h3>
                        <img src={restorationImage} alt="Restoration Analysis" className="w-72 h-auto rounded-md border mt-2" />
                    </div>
                )}

                {implantImage && (
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold text-green-600">Implant Detection</h3>
                        <img src={implantImage} alt="Implant Analysis" className="w-72 h-auto rounded-md border mt-2" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
