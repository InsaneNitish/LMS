// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    visible: false,
    userId: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const libraryId = localStorage.getItem("libraryId");
        if (!libraryId) {
          toast.error(
            "Library ID not found. Please login again as admin."
          );
          return;
        }
        const response = await axios.post(
          "http://localhost:8080/api/admin/getMembers",
          { libraryId }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setUpdatedUser({ ...user });
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/updateMember/${userId}`,
        updatedUser
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
    } catch (error) {
      toast.error("Error updating user.");
      console.error(error);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteConfirmation({ visible: true, userId });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/admin/deleteMember/${deleteConfirmation.userId}`
      );
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== deleteConfirmation.userId));
      setDeleteConfirmation({ visible: false, userId: null });
    } catch (error) {
      toast.error("Error deleting user.");
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ visible: false, userId: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="flex justify-center items-center w-screen bg-gray-100 min-h-screen relative">
      <Toaster />
      <div className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white p-8 w-[80%]">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">Name</th>
              <th className="border-b p-4 text-left">Email</th>
              <th className="border-b p-4 text-left">Phone</th>
              <th className="border-b p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border-b p-4">
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border-b p-4">
                  {editingUser === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border-b p-4">
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td className="border-b p-4 text-center">
                  {editingUser === user._id ? (
                    <button
                      onClick={() => handleSave(user._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.visible && (
        <div className="absolute bottom-4 w-[80%] bg-white p-4 shadow-lg rounded-md border border-gray-200 flex justify-between items-center">
          <p className="text-gray-700">Are you sure you want to delete this user?</p>
          <div>
            <button
              onClick={confirmDelete}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
