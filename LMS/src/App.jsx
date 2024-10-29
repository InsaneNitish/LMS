// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Books from './components/books.jsx';
import BookForm from './components/addBook.jsx';
import Users from './components/users.jsx';
import CreateLibrary from './components/createLibrary.jsx';
import AdminRegister from './components/adminRegister.jsx';
import AdminLogin from './components/adminLogin.jsx';
import AdminDashboard from './components/adminDashboard.jsx';
import UserRegister from './components/userRegister.jsx';
import ManageUsers from './components/manageUsers.jsx';
import SearchUser from './components/searchUsers.jsx';
import UserList from './components/userList.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/CreateLibrary" element={<CreateLibrary />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path='/userRegister' element={<UserRegister/>}/>
          <Route path='/manageUsers' element={<ManageUsers/>}/>
          <Route path='/searchUsers' element={<SearchUser/>}/>
          <Route path='/userList' element={<UserList/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
