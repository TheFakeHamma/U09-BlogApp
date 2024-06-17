import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const likeBlog = async (id, token, userId, setBlog) => {
    if (!token) {
        return; // Redirect to login if not logged in
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };

    try {
        await axios.put(`${API_BASE_URL}/blogs/like/${id}`, {}, config);
        setBlog((prevBlog) => ({
            ...prevBlog,
            likes: [...prevBlog.likes, userId],
        }));
    } catch (err) {
        console.error(err.response.data);
    }
};

export const unlikeBlog = async (id, token, userId, setBlog) => {
    if (!token) {
        return; // Redirect to login if not logged in
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };

    try {
        await axios.put(`${API_BASE_URL}/blogs/unlike/${id}`, {}, config);
        setBlog((prevBlog) => ({
            ...prevBlog,
            likes: prevBlog.likes.filter((like) => like !== userId),
        }));
    } catch (err) {
        console.error(err.response.data);
    }
};
