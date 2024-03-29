// Schedule.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SchedulePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  margin-top: 125px;
  color: black;
`;

const ScheduleTable = styled.table`
  width: 150%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 2px solid #006665;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const ColoredTableData = styled(TableData)`
  background-color: #f7f7f7;
`;

const Schedule = ({ currentUser }) => {
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserEnrollments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/enrollment?StuID=${currentUser.StuID}`);
        if (response.ok) {
          const userEnrollmentData = await response.json();
          setUserEnrollments(userEnrollmentData);
        } else {
          console.error('Failed to fetch user enrollments');
        }
      } catch (error) {
        console.error('Error during user enrollment fetch:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/courses');
        if (response.ok) {
          const coursesData = await response.json();
          setCourses(coursesData);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error during courses fetch:', error);
      }
    };

    fetchUserEnrollments();
    fetchCourses();
  }, [currentUser]);

  const getCourseInfo = (courseID) => {
    return courses.find((course) => course.courseID === courseID);
  };

  const renderScheduleTable = () => {
    if (userEnrollments.length === 0) {
      return <h3 style={{ color: 'red' }}>คุณยังไม่มีการลงทะเบียน</h3>;
    }

    return (
      <ScheduleTable>
        <thead>
          <tr>
            <TableHeader>วัน</TableHeader>
            <TableHeader>เวลา</TableHeader>
            <TableHeader>วิชา</TableHeader>
            <TableHeader>สถานที่</TableHeader>
          </tr>
        </thead>
        <tbody>
          {userEnrollments.map((enrollment) => {
            const courseInfo = getCourseInfo(enrollment.courseID);

            if (courseInfo) {
              return (
                <tr key={enrollment.EnrollmentID}>
                  <ColoredTableData>{courseInfo.schedule.day}</ColoredTableData>
                  <ColoredTableData>{courseInfo.schedule.time}</ColoredTableData>
                  <ColoredTableData>{courseInfo.courseName}</ColoredTableData>
                  <ColoredTableData>{courseInfo.schedule.location}</ColoredTableData>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </ScheduleTable>
    );
  };

  return (
    <SchedulePage>
      <h2 style={{ textAlign: 'center', color: 'black' }}>ตารางเรียน</h2>
      {renderScheduleTable()}
    </SchedulePage>
  );
};

export default Schedule;
