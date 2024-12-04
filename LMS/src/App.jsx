// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home.jsx";
import BookForm from "./components/addBook.jsx";
import CreateLibrary from "./components/createLibrary.jsx";
import AdminRegister from "./components/adminRegister.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import AdminDashboard from "./components/adminDashboard.jsx";
import UserRegister from "./components/userRegister.jsx";
import ManageUsers from "./components/manageUsers.jsx";
import SearchUser from "./components/searchUsers.jsx";
import UserList from "./components/userList.jsx";
import Settings from "./components/adminProfile.jsx";
import LibraryDetails from "./components/libraryDetails.jsx";
import ManageBooks from "./components/manageBooks.jsx";
import BookList from "./components/bookList.jsx";
import UserLogin from "./components/userLogin.jsx";
import UserDashboard from "./components/userDashboard.jsx";
import ReservationsPage from "./components/bookReservation.jsx";
import BookSearchPage from "./components/bookSearchPage.jsx";

const App = () => {
  return (
    <Router>
      <div className="bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateLibrary" element={<CreateLibrary />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/addBook" element={<BookForm />} />
          <Route path="/searchUsers" element={<SearchUser />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/libraryDetails" element={<LibraryDetails />} />
          <Route path="/manageBooks" element={<ManageBooks />} />
          <Route path="/bookList" element={<BookList />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/bookReservation" element={<ReservationsPage />} />
          <Route path="/bookSearch" element={<BookSearchPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
