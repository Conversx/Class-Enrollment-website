// Sidebar.jsx
import styled from 'styled-components';
import { css } from 'styled-components';
import { FaTimes, FaHome, FaInfo, FaEnvelope, FaUser } from 'react-icons/fa';
import { MdSubject } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { IoNewspaper, IoFileTrayStacked } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
font-family: 'Kanit', sans-serif;
  background-color: #2F3337;
  color: white;
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  ${({ isOpen }) =>
    isOpen
      ? css`
          left: 0;
        `
      : css`
          left: -250px;
        `}
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const CloseIcon = styled(FaTimes)`
  font-size: 20px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%; /* Set width to 100% to center the content */
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover; /* Ensure the image covers the entire container */
`;

const UserName = styled.span`
  font-size: 16px;
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #555;
  margin: 10px 0;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;

  svg {
    margin-right: 10px; 
  }

  &:hover {
    color: #4CAF50;
  }

  &:active {
    color: #45a049;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SidebarLinkWithIcon = ({ to, icon, label, onClick }) => (
  <SidebarLink to={to} onClick={onClick}>
    <IconContainer>
      {icon}
      <span>{label}</span>
    </IconContainer>
  </SidebarLink>
);

const Sidebar = ({ isOpen, closeSidebar, handlePageChange, userData, ...rest }) => {
  const closeAndNavigate = (page) => {
    closeSidebar();
    if (handlePageChange) {
      handlePageChange(page);
    }
  };

  return (
    <SidebarContainer isOpen={isOpen} data-isopen={isOpen} {...rest}>
      <CloseIcon onClick={closeSidebar} />
      {userData && (
        <AvatarContainer>
          <Avatar src={userData.avatar} alt="User Avatar" />
          <UserName>{`${userData.firstName} ${userData.lastName}`}</UserName>
        </AvatarContainer>
      )}
      <Divider />
      <SidebarLinkWithIcon to="/" icon={<IoNewspaper />} label="หน้าหลัก" onClick={() => closeAndNavigate('Home')} />
      <SidebarLinkWithIcon to="/user" icon={<FaUser />} label="ข้อมูลนิสิต" onClick={() => closeAndNavigate('User')} />
      <SidebarLinkWithIcon to="/schedule" icon={<MdSpaceDashboard />} label="ตารางเรียน" onClick={() => closeAndNavigate('Schedule')} />
      <Divider />
      <SidebarLinkWithIcon to="/courses" icon={<MdSubject />} label="รายวิชา" onClick={() => closeAndNavigate('Courses')} />
      <SidebarLinkWithIcon to="/enrollment" icon={<IoFileTrayStacked />} label="ลงทะเบียนเรียน" onClick={() => closeAndNavigate('Enrollment')} />
      <SidebarLinkWithIcon to="/dashboard" icon={<MdSpaceDashboard />} label="ผลการลงทะเบียน" onClick={() => closeAndNavigate('Dashboard')} />
    </SidebarContainer>
  );
};

export default Sidebar;
