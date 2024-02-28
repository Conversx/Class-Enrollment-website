// CourseDialog.jsx
import React from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContent = styled.div`
  color: #333;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  background-color: #e74c3c; /* Red color */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CourseTitle = styled.h3`
  margin-bottom: 10px;
  color: #006665;
`;

const CourseInfo = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const CourseDialog = ({ course, onClose }) => (
  <DialogOverlay>
    <DialogContent>
      <CloseButton onClick={onClose}>ปิด</CloseButton>
      <CourseTitle>{course.courseName}</CourseTitle>
      <CourseInfo><strong>รหัสวิชา:</strong> {course.courseID}</CourseInfo>
      <CourseInfo><strong>ชื่อวิชา:</strong> {course.courseName}</CourseInfo>
      <CourseInfo><strong>หน่วยกิต:</strong> {course.credit}</CourseInfo>
      <Description>{course.description}</Description>
    </DialogContent>
  </DialogOverlay>
);

export default CourseDialog;
