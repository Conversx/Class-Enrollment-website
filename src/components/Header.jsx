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
          <img src="https://media.discordapp.net/attachments/1023613706732572683/1212789183794647070/mcul.png?ex=65f31cf1&is=65e0a7f1&hm=582219314d084ab0c587b13bad9878303ef6717f9d565c126f35ec9a40c90a54&=&format=webp&quality=lossless&width=881&height=167" alt="Logo" width="40" height="40" />
        </Logo>
        <PowerOffIcon onClick={handleLogout} />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
