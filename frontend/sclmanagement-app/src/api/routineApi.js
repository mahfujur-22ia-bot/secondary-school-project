import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function fetchAllRoutines() {
  try {
    const response = await axios.get(`${backend_url}/routines/`);
    return response.data;
  } catch (error) {
    console.error("Fetch Routines Error:", error.response?.data || error.message);
    return [];
  }
}
