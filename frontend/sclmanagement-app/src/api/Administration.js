import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function createAdministration(administrationData) {
    try {
        const response = await axios.post(`${backend_url}/administrations/`, administrationData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Administration created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
    }
}

export async function fetchAllAdministrations() {
    try {
        const response = await axios.get(`${backend_url}/administrations/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Administrations fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        return [];
    }
}