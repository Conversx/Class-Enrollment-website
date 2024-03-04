// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Home from './pages/Home';
import User from './pages/User';
import CourseList from './pages/CourseList';
import Enrollment from './pages/Enrollment';
import Dashboard from './pages/Dashboard';
import NewsDetails from './pages/NewsDetails';
import usersData from './assets/data.json';
import Schedule from './pages/Schedule';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #EBEBE8;
    font-family: 'Kanit', sans-serif;
  }
`;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Home');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(usersData.users);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const handleLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      setLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง!');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  };

  // Function to handle enrollment
  const handleEnrollment = async (newEnrollment) => {
    try {
      const response = await fetch('http://localhost:3001/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEnrollment)
      });

      if (response.ok) {
        alert('Enrollment successful');
        // Redirect or update the UI as needed
      } else {
        const errorMessage = await response.json();
        console.error(errorMessage.message);
      }
    } catch (error) {
      console.error('Error during enrollment:', error);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['isOpen'].includes(prop)}>
      <Router>
        <>
          <GlobalStyle />
          {isLoggedIn ? (
            <>
              <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
              <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} handlePageChange={handlePageChange} userData={currentUser} />
              <Routes>
                <Route path="/" element={<Home userData={currentUser} />} />
                <Route path="/user" element={<User userData={currentUser} />} />
                <Route path="/courses" element={<CourseList courses={usersData.courses} />} />
                <Route path="/news/:id" element={<NewsDetails />} />
                <Route path="/enrollment" element={<Enrollment handleEnrollment={handleEnrollment} currentUser={currentUser} courses={usersData.courses} />} />
                <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
                <Route path="/schedule" element={<Schedule currentUser={currentUser} />} />
              </Routes>
            </>
          ) : (
            <Login handleLogin={handleLogin} />
          )}
        </>
      </Router>
    </StyleSheetManager>
  );
}

export default App;
