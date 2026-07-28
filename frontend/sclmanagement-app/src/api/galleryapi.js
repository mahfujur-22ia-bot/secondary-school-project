import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function createGalleryImage(imageData) {
    try {
        const response = await axios.post(`${backend_url}/gallery/`, imageData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Gallery image created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
    }
}

export async function fetchAllGalleryImages() {
    try {
        const response = await axios.get(`${backend_url}/gallery/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Gallery fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        return [];
    }
}