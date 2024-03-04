// Enrollment.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin-top: 125px;
`;

const CourseContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  flex-grow: 1;
`;

const CourseBox = styled.div`
  width: 300px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const CourseItem = styled.div`
  margin-bottom: 15px;
  color: black;
`;

const EnrollmentButton = styled.button`
  background-color: #00a31c;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NavigationButton = styled.button`
  background-color: #006f13;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Enrollment = ({ courses, currentUser }) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCourses = filteredCourses.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/enrollment?StuID=${currentUser.StuID}`);
        if (response.ok) {
          const enrollments = await response.json();
          setUserEnrollments(enrollments);
        } else {
          console.error('Failed to fetch user enrollments');
        }
      } catch (error) {
        console.error('Error during enrollment fetch:', error);
      }
    };

    if (currentUser && currentUser.StuID) {
      fetchEnrollments();
    }
  }, [currentUser]);

  const isEnrolled = (courseID) => {
    return userEnrollments.some((enrollment) => enrollment.courseID === courseID);
  };

  const handleEnrollment = async (courseID, courseName, credit, schedule) => {
    if (isEnrolled(courseID)) {
      alert('คุณได้ลงทะเบียนวิชานี้แล้ว');
      return;
    }

    // Check for schedule conflicts
    const hasScheduleConflict = userEnrollments.some(
      (enrollment) =>
        enrollment.schedule &&
        schedule &&
        enrollment.schedule.day === schedule.day &&
        enrollment.schedule.time === schedule.time
    );

    if (hasScheduleConflict) {
      alert('มีคอร์สที่มีการเรียนซ้ำกันในเวลานี้แล้ว');
      return;
    }

    const newUser = {
      StuID: currentUser.StuID,
      EnrollmentID: generateEnrollmentID(), // New line: Generate EnrollmentID
      courseID: courseID,
      courseName: courseName,
      credit: credit,
      schedule: schedule,
    };

    try {
      console.log('Enrolling user:', newUser);

      const response = await fetch('http://localhost:3001/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === 'Already enrolled') {
          alert('คุณได้ลงทะเบียนวิชานี้แล้ว');
        } else {
          alert('ลงทะเบียนเรียนสำเร็จ!!');
          setUserEnrollments([...userEnrollments, newUser]);
        }
      } else {
        const errorMessage = await response.json();
        alert(`Enrollment failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during enrollment:', error);
      alert('An error occurred during enrollment');
    }
  };

  // New function: Generate EnrollmentID
  const generateEnrollmentID = () => {
    return `EN${Date.now()}`;
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
    filterCourses(event.target.value);
  };

  const filterCourses = (term) => {
    const filtered = courses.filter(
      (course) =>
        course.courseID.toLowerCase().includes(term.toLowerCase()) ||
        course.courseName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    filterCourses(searchTerm);
  }, [searchTerm, courses]);

  return (
    <CenteredContainer>
      <h2 style={{ textAlign: 'center', color: 'black' }}>ลงทะเบียนรายวิชา</h2>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="ค้าหา...(ชื่อวิชา, รหัสวิชา)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      <CourseContainer>
        {visibleCourses.map((course) => (
          <CourseBox key={course.id}>
            <CourseItem>
              <strong>รหัสวิชา:</strong> {course.courseID}
            </CourseItem>
            <CourseItem>
              <strong>ชื่อวิชา:</strong> {course.courseName}
            </CourseItem>
            <CourseItem>
              <strong>หน่วยกิต:</strong> {course.credit}
            </CourseItem>
            {course.schedule && (
              <CourseItem>
                <strong>วันเวลา:</strong> {course.schedule.day} {course.schedule.time}
              </CourseItem>
            )}
            {course.schedule && (
              <CourseItem>
                <strong>สถานที่เรียน:</strong> {course.schedule.location}
              </CourseItem>
            )}
            {isEnrolled(course.courseID) ? (
              <p style={{ color: 'black' }}>คุณได้ลงทะเบียนวิชานี้แล้ว</p>
            ) : (
              <EnrollmentButton
                onClick={() =>
                  handleEnrollment(course.courseID, course.courseName, course.credit, course.schedule)
                }
              >
                ลงทะเบียนเรียน
              </EnrollmentButton>
            )}
          </CourseBox>
        ))}
        <NavigationContainer>
          <NavigationButton onClick={handlePrevPage} disabled={page === 1}>
            ย้อนกลับ
          </NavigationButton>
          <NavigationButton onClick={handleNextPage} disabled={endIndex >= filteredCourses.length}>
            หน้าถัดไป
          </NavigationButton>
        </NavigationContainer>
      </CourseContainer>
    </CenteredContainer>
  );
};

export default Enrollment;
