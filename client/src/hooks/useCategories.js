import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get("/api/v1/category/get-categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return categories;
}

export default useCategories