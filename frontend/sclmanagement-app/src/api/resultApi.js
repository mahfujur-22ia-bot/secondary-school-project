import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL || "http://127.0.0.1:8000/api";

export async function searchResults({ rollNumber, className, passingYear }) {
  try {
    const response = await axios.get(`${backend_url}/results/search/`, {
      params: {
        roll_number: rollNumber,
        class_name: className,
        passing_year: passingYear,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: [],
      error: error.response?.data?.detail || "No result found for the given information.",
    };
  }
}
