import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/mcu.png'; 


// Logo component
const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 200px; /* Adjust the width as needed */
`;

// LoginForm component
const LoginForm = styled.form`
  max-width: 300px;
  margin: 0 auto;
  padding: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  font-family: 'Kanit', sans-serif;
`;

const Title = styled.h1`
  color: #4caf50; /* Green color */
  text-align: center;
  margin-bottom: 30px;
  font-size: 18px; /* Adjust the font size as needed */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #878787;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #878787;
  background-color: #f8f8f8;
  font-family: 'Kanit', sans-serif;

  &:focus {
    border-color: #8dff8f;
  }
`;

const Button = styled.button`
  background-color: #4caf50; /* Green color */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Validate username length
    if (e.target.value.length >= 10) {
      setUsernameError('');
    } else {
      setUsernameError('*บัญชีผู้ใช้ 10 ตัวอักษรขึ้นไป');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Validate password length
    if (e.target.value.length >= 8) {
      setPasswordError('');
    } else {
      setPasswordError('*รหัสผ่าน 8 ตัวอักษรขึ้นไป');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Check if both username and password are not empty
    if (username.trim() !== '' && password.trim() !== '') {
      // Check if there are errors before submitting
      if (username.length >= 10 && password.length >= 8) {
        handleLogin(username, password);
      } else {
        // Display length error messages if there are validation errors
        setUsernameError('*บัญชีผู้ใช้ 10 ตัวอักษรขึ้นไป');
        setPasswordError('*รหัสผ่าน 8 ตัวอักษรขึ้นไป');
      }
    } else {
      // Display required field error messages
      setUsernameError('*กรุณาใส่บัญชีผู้ใช้');
      setPasswordError('*กรุณาใส่รหัสผ่าน');
    }
  };
  

  return (
    <>
      {/* Logo component outside the form */}
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>

      <LoginForm onSubmit={handleFormSubmit}>
        <Title>เข้าใช้งานระบบลงทะเบียนนิสิต</Title>
        <Label>
          บัญชีผู้ใช้งาน :
          <Input type="text" value={username} onChange={handleUsernameChange} />
          {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
        </Label>
        <Label>
          รหัสผ่าน :
          <Input type="password" value={password} onChange={handlePasswordChange} />
          {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        </Label>
        <Button type="submit">Login</Button>
      </LoginForm>
    </>
  );
};

export default Login;