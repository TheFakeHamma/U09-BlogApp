import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBlog = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addComment = async (id, commentText, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL}/blogs/comment/${id}`,
            { text: commentText },
            config
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const editComment = async (id, commentId, commentText, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };

    try {
        const response = await axios.put(
            `${API_BASE_URL}/blogs/comment/${id}/${commentId}`,
            { text: commentText },
            config
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteComment = async (id, commentId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };

    try {
        const response = await axios.delete(
            `${API_BASE_URL}/blogs/comment/${id}/${commentId}`,
            config
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchBlogs = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/paginated?page=${page}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const searchBlogs = async (query, page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/search?query=${query}&page=${page}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchBlogsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs?category=${category}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
