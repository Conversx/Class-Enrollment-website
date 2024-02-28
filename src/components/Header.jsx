// Header.jsx
import React from 'react';
import styled from 'styled-components';
import { FaBars, FaPowerOff } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #fff;
  color: white;
  padding: 4px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
`;

const HeaderIcons = styled.div`
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: #000;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: auto;
  margin-left: auto; 

  img {
    width: 450px;
    height: 40px;
    object-fit: contain; /* or use 'cover', 'fill', or 'none' based on your preference */
  }
`;

const PowerOffIcon = styled(FaPowerOff)`
  margin-right: 30px;
  font-size: 25px;
  color: red;
`;

const Header = ({ toggleSidebar, handleLogout }) => {
  return (
    <HeaderContainer>
      <HeaderIcons onClick={toggleSidebar}>
        <FaBars />
      </HeaderIcons>
      <HeaderContent>
        <Logo>
          <img src="/src/assets/mcul.png" alt="Logo" width="40" height="40" />
        </Logo>
        <PowerOffIcon onClick={handleLogout} />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
