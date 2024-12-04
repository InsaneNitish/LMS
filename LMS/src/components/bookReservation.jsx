import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast ,Toaster} from 'react-hot-toast';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [error, setError] = useState('');

  // Fetch all reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const libraryId = localStorage.getItem('libraryId');
        const response = await axios.post('http://localhost:8080/api/admin/getReservations', { libraryId });
        setReservations(response.data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        toast.error('Failed to fetch reservations');
        setError('Failed to fetch reservations');
      }
    };
    fetchReservations();
  }, []);

  // Fetch borrower details for a specific reservation
  const fetchBorrowerDetails = async (borrowerId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/admin/getMemberById`, { borrowerId });
      setBorrowerDetails((prevDetails) => ({
        ...prevDetails,
        [borrowerId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching borrower details:', error);
      toast.error('Failed to fetch borrower details');
    }
  };

  // Toggle additional details for a specific reservation
  const toggleDetails = (reservation) => {
    if (expandedRow === reservation._id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(reservation._id);
      if (!borrowerDetails[reservation.borrowerId]) {
        fetchBorrowerDetails(reservation.borrowerId);
      }
    }
  };

  // Function to handle reservation approval/rejection
  const handleApproveReject = async (reservationId, action) => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/approveRejectReservation', {
        borrowerId: reservationId.borrowerId,
        bookId: reservationId.bookId,
        approve: action === 'approve',
        disprove: action === 'reject',
      });
      toast.success(response.data.msg);
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === reservationId._id ? { ...res, status: action === 'approve' ? 'Completed' : 'Rejected' } : res
        )
      );
    } catch (error) {
      console.error('Error approving/rejecting reservation:', error);
      toast.error('Failed to update reservation status');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      <Toaster/>
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Reservations</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 border-b font-medium text-left">Borrower ID</th>
              <th className="px-6 py-3 border-b font-medium text-left">Book ID</th>
              <th className="px-6 py-3 border-b font-medium text-left">Status</th>
              <th className="px-6 py-3 border-b font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <React.Fragment key={reservation._id}>
                <tr className="odd:bg-gray-50">
                  <td className="px-6 py-4 border-b text-sm text-gray-800">{reservation.borrowerId}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-800">{reservation.bookId}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-800">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        reservation.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-700'
                          : reservation.status === 'Completed'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-800">
                    <div className="flex gap-2">
                      {reservation.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApproveReject(reservation, 'approve')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveReject(reservation, 'reject')}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => toggleDetails(reservation)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      >
                        {expandedRow === reservation._id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === reservation._id && borrowerDetails[reservation.borrowerId] && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 bg-gray-50 border-b">
                      <div className="p-4 rounded bg-gray-100 shadow-inner">
                        <h3 className="font-semibold mb-2 text-gray-700">Borrower Details:</h3>
                        <p className="text-sm text-gray-600"><strong>Name:</strong> {borrowerDetails[reservation.borrowerId].name}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {borrowerDetails[reservation.borrowerId].email}</p>
                        <p className="text-sm text-gray-600"><strong>Phone:</strong> {borrowerDetails[reservation.borrowerId].phone}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsPage;
