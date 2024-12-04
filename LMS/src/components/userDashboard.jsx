import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import BackButton from "./BackButton.jsx";

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [reservationHistory, setReservationHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const borrowerId = localStorage.getItem("borrowerId"); // Assuming borrowerId]); is stored in localStorage
  console.log(borrowerId);
  

  useEffect(() => {
    // Fetch reservation history from the backend
    const fetchReservationHistory = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/user/book/reservation/status",{borrowerId});
        setReservationHistory(response.data);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching reservation history:", error);
      }
    };

    fetchReservationHistory();
  }, [borrowerId]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleReserveBook = () => {
    closeModal();
    toast.success("Redirecting to book search...");
    navigate("/bookSearch"); // Redirect to /bookSearch
  };

  const handlePayFine = () => {
    toast.success("Fine paid successfully!");
    closeModal();
  };

  const handleViewReports = () => {
    toast("Viewing your reports...", { icon: "📄" });
    closeModal();
  };

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    <div className="bg-gray-100 p-10 min-h-[200vh]">
      <Toaster position="top-right" />
      <BackButton className="bg-transparent text-black hover:bg-gray-200 p-2 rounded-md w-[30px] h-[30px]" />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reserve Book Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer"
          onClick={handleReserveBook} // Redirects immediately to /bookSearch
        >
          <h2 className="text-xl font-bold text-green-600 mb-4">Reserve a Book</h2>
          <p className="text-gray-600 mb-4">You can reserve a book here</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Reserve Now
          </button>
        </div>

        {/* Pay Fines Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer"
          onClick={() => openModal("payFine")}
        >
          <h2 className="text-xl font-bold text-red-600 mb-4">Pay Fines</h2>
          <p className="text-gray-600 mb-4">Pay any outstanding fines</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Pay Now
          </button>
        </div>

        {/* View Reports Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer"
          onClick={() => openModal("viewReports")}
        >
          <h2 className="text-xl font-bold text-blue-600 mb-4">View Reports</h2>
          <p className="text-gray-600 mb-4">Check your account history</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Reports
          </button>
        </div>

        {/* Reservation History Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer"
          onClick={toggleHistoryVisibility}
        >
          <h2 className="text-xl font-bold text-purple-600 mb-4">Reservation History</h2>
          <p className="text-gray-600 mb-4">View your past book reservations</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            View History
          </button>
        </div>
      </div>

      {/* Reservation History Modal */}
      {isHistoryVisible && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Reservation History</h2>
          {reservationHistory.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Book ID</th>
                  <th className="border border-gray-300 px-4 py-2">Library ID</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Reservation Date</th>
                </tr>
              </thead>
              <tbody>
                {reservationHistory.map((reservation) => (
                  <tr key={reservation._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{reservation.bookId}</td>
                    <td className="border border-gray-300 px-4 py-2">{reservation.libraryId}</td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${
                        reservation.status === "Completed"
                          ? "text-green-500"
                          : reservation.status === "Rejected"
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      {reservation.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(reservation.reservationDate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No reservations found.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "reserve"
                ? "Reserve a Book"
                : modalType === "payFine"
                ? "Pay Fine"
                : "View Reports"}
            </h2>
            <div className="mb-4">
              {modalType === "reserve" && (
                <div>
                  <label className="block mb-2 text-sm font-medium">Select a Book:</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="Book 1">Book 1</option>
                    <option value="Book 2">Book 2</option>
                    <option value="Book 3">Book 3</option>
                  </select>
                </div>
              )}
              {modalType === "payFine" && (
                <div>
                  <p className="text-gray-600">You have a fine of $10.</p>
                  <button
                    className="px-4 py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handlePayFine}
                  >
                    Pay Fine
                  </button>
                </div>
              )}
              {modalType === "viewReports" && (
                <div>
                  <p className="text-gray-600">Here are your recent activities.</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Reserved "Book 1" on 2024-11-10</li>
                    <li>Paid fine on 2024-11-05</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
