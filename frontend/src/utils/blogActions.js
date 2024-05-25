import axios from "axios";

export const likeBlog = async (id, token, userId, setBlogs) => {
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
        const res = await axios.put(`http://localhost:5000/api/blogs/like/${id}`, {}, config);
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog._id === id ? res.data : blog
            )
        );
    } catch (err) {
        console.error(err.response.data);
    }
};

export const unlikeBlog = async (id, token, userId, setBlogs) => {
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
        const res = await axios.put(
            `http://localhost:5000/api/blogs/unlike/${id}`,
            {},
            config
        );
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog._id === id ? res.data : blog
            )
        );
    } catch (err) {
        console.error(err.response.data);
    }
};
