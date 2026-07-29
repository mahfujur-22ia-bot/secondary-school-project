import axios from "axios";

// const backend_url = import.meta.env.VITE_API_backend_URL;

export async function fetchAllStudents() {
  try {
    const response = await axios.get("/students");    //`${backend_url}/students/`
    return response.data;
  } catch (error) {
    console.error("Fetch Students Error:", error.response?.data || error.message);
    return [];
  }
}
