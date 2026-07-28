import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function verifyCertificate(certificateNumber) {
  try {
    const response = await axios.get(`${backend_url}/certificates/verify/${certificateNumber}/`);
    return response.data;
  } catch (error) {
    console.error("Verify Certificate Error:", error.response?.data || error.message);
    throw error;
  }
}
