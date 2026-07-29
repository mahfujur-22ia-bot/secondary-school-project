import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function createImportantLink(linkData) {
    try {
        const response = await axios.post(`${backend_url}/important-links/`, linkData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Important Link created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
    }
}

export async function fetchAllImportantLinks() {
    try {
        const response = await axios.get(`${backend_url}/important-links/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Important Links fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        return [];
    }
}