
import axios from "axios";

const backend_url = import.meta.env.VITE_API_backend_URL;

// Create Notice
export async function createNotice(noticeData) {
  try {
    const response = await axios.post(
      `${backend_url}/notices/`,
      noticeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Create Notice Error:", error.response?.data || error.message);
    throw error;
  }
}

// Get All Notices
export async function fetchAllNotices() {
  try {
    const response = await axios.get(`${backend_url}/notices/`);
    return response.data;
  } catch (error) {
    console.error("Fetch Notices Error:", error.response?.data || error.message);
    return [];
  }
}

// Get Single Notice
export async function fetchNotice(id) {
  try {
    const response = await axios.get(`${backend_url}/notices/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Fetch Notice Error:", error.response?.data || error.message);
    return null;
  }
}

// Update Notice
export async function updateNotice(id, noticeData) {
  try {
    const response = await axios.put(
      `${backend_url}/notices/${id}/`,
      noticeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Notice Error:", error.response?.data || error.message);
    throw error;
  }
}

// Delete Notice
export async function deleteNotice(id) {
  try {
    await axios.delete(`${backend_url}/notices/${id}/`);
    return true;
  } catch (error) {
    console.error("Delete Notice Error:", error.response?.data || error.message);
    return false;
  }
}