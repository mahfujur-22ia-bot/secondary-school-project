import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function createContactMessage(messageData) {
    try {
        const response = await axios.post(`${backend_url}/contact-messages/`, messageData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Message sent successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
    }
}

export async function fetchAllContactMessages() {
    try {
        const response = await axios.get(`${backend_url}/contact-messages/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Messages fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        return [];
    }
}