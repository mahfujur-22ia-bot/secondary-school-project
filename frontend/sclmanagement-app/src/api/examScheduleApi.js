import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

export async function fetchAllExamSchedules() {
  try {
    const response = await axios.get(`${backend_url}/exam-schedules/`);
    return response.data;
  } catch (error) {
    console.error("Fetch Exam Schedules Error:", error.response?.data || error.message);
    return [];
  }
}
