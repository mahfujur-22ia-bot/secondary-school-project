import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function fetchAllAttendance() {
  try {
    const response = await axios.get(`${backend_url}/attendance/`);
    return response.data;
  } catch (error) {
    console.error("Fetch Attendance Error:", error.response?.data || error.message);
    return [];
  }
}
