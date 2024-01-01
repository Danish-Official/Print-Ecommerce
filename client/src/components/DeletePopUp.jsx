import React, { useState } from "react";
import "../Styles/deletePopUp.css";

const DeletePopUp = ({ deleteModal, setDeleteModal, cid, deleteCategory }) => {
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <>
      <div
        className={deleteModal && "deleteModal-wrapper"}
        onClick={() => closeDeleteModal()}
      ></div>
      <div className={deleteModal ? "deleteModal" : "hideDeleteModal"}>
        <p>
          WARNING: Deleting category will delete all the products associated
          with it. Instead edit the category name.
        </p>
        <button
          className="login-btn"
          onClick={() => {
            deleteCategory(cid);
            closeDeleteModal();
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default DeletePopUp;
