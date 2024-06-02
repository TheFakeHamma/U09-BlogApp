import axios from "axios";

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
        await axios.put(`http://localhost:5000/api/blogs/like/${id}`, {}, config);
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
        await axios.put(
            `http://localhost:5000/api/blogs/unlike/${id}`,
            {},
            config
        );
        setBlog((prevBlog) => ({
            ...prevBlog,
            likes: prevBlog.likes.filter((like) => like !== userId),
        }));
    } catch (err) {
        console.error(err.response.data);
    }
};
