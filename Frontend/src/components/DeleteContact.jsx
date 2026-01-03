import React from 'react'
import { toast } from "react-toastify";

const DeleteContact = ({ id, onDelete }) => {
  const handleDeleteClick = async () => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`https://contact-add-delete.onrender.com/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Contact deleted successfully!");
      onDelete?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact");
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
    >
      Delete
    </button>
  )
}

export default DeleteContact;
