import React, { useState } from 'react';

const User = ({ userData }) => {
  const [showBasicInfo, setShowBasicInfo] = useState(false);

  const boldTextStyle = {
    fontWeight: 'bold',
    color: '#333',
  };

  const regularTextStyle = {
    color: '#333',
  };

  const userCardStyle = {
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    marginTop: '130px',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    fontFamily: 'Kanit, sans-serif',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
    ':hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.02)',
    },
  };

  const cardContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer', // Add cursor pointer for interaction
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginRight: '16px',
    border: '2px solid #aaa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const userInfoStyle = {
    flex: 1,
  };

  const basicInfoStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    marginTop: '16px',
    display: showBasicInfo ? 'block' : 'none', // Toggle display based on state
  };

  const toggleBasicInfo = () => {
    setShowBasicInfo(!showBasicInfo);
  };

  return (
    <div>
      <div style={userCardStyle} onClick={toggleBasicInfo}>
        <h2 style={{ ...boldTextStyle, ...regularTextStyle }}>ข้อมูลนิสิต</h2>
        {userData && (
          <div>
            <div style={cardContainerStyle}>
              <img src={userData.avatar} alt="User Avatar" style={avatarStyle} />
              <div style={userInfoStyle}>
                <h2 style={{ ...boldTextStyle, ...regularTextStyle }}>ชื่อ: {userData.firstName} {userData.lastName}</h2>
                <p style={regularTextStyle}>รหัส: {userData.StuID}</p>
                <p style={regularTextStyle}>คณะ: {userData.faculty}</p>
                <p style={regularTextStyle}>สาขา: {userData.major}</p>
              </div>
            </div>
            <div style={basicInfoStyle}>
              <h3 style={{ ...boldTextStyle, ...regularTextStyle }}>ข้อมูลพื้นฐาน</h3>
              <p style={regularTextStyle}>ชื่อ-สกุล: {userData.firstName} {userData.lastName}</p>
              <p style={regularTextStyle}>ชื่อ-สกุล(ภาษาอังกฤษ): {userData.EfirstName} {userData.ElastName}</p>
              <p style={regularTextStyle}>อายุ: {userData.ages}</p>
              <p style={regularTextStyle}>เพศ: {userData.gender}</p>
              <p style={regularTextStyle}>ศาสนา: {userData.religion}</p>
              <p style={regularTextStyle}>สัญชาติ: {userData.nationality}</p>
            </div>
          </div>
        )}
      </div>
      <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>คลิกเพื่อดูข้อมูลพื้นฐาน</p>
    </div>
  );
};

export default User;
