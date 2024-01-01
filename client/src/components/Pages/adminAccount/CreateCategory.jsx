import React, { useEffect, useState } from "react";
import "../../../Styles/createCategory.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import DeletePopUp from "../../DeletePopUp";

const CreateCategory = () => {
  const [editCategory, setEditCategory] = useState();
  const [categoryInput, setCategoryInput] = useState();
  const [activeItem, setActiveItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cid, setCid] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEdit = (index) => {
    if (activeItem === index) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  }
  const handleDeleteModal = (Cid) => {
    setCid(Cid);
    openDeleteModal();
  };
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/category/update-category", {
        editCategory,
        cid,
      });
      alert(response.data.message);
      setActiveItem(null);
      getCategories();
      setEditCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.post("/api/v1/category/delete-category", {
        id,
      });
      alert(response.data.message);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const categoryHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/category/create-category", {
        categoryInput,
      });
      alert(response.data.message);
      setCategoryInput("");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="createCategory">
      <h2>Create Category</h2>
      <form onSubmit={categoryHandleSubmit}>
        <input
          type="text"
          placeholder="Enter category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button type="sumbit" className="login-btn">
          Create
        </button>
      </form>
      <div className="category-list">
        <table>
          <tr>
            <th>Sr. No.</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}.</td>
              <td>
                {activeItem === index ? (
                  <form onSubmit={updateCategory}>
                    <input
                      type="text"
                      id="editInput"
                      placeholder="Edit category"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={() => setCid(category._id)}
                      className="update-btn"
                    >
                      Update
                    </button>
                  </form>
                ) : (
                  <div className="categoryName">{category.name}</div>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(index)}>
                  <i className="edit-icon">
                    <FiEdit size={"1.6rem"} />
                  </i>
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteModal(category._id)}>
                  <i className="delete-icon">
                    <RiDeleteBin5Fill size={"1.6rem"} />
                  </i>
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <DeletePopUp deleteCategory={deleteCategory} cid={cid} deleteModal= {deleteModal} setDeleteModal={setDeleteModal} />
    </div>
  );
};

export default CreateCategory;
