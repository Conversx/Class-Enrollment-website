// CourseList.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import CourseDialog from './CourseDialog';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin-top: 125px;
  background-color: #EBEBE8;
`;

const CourseContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  flex-grow: 1;
  background-color: #EBEBE8;
`;

const CourseBox = styled.div`
  width: 300px;
  margin: 10px auto; /* ใส่ margin: 10px auto; เพื่อให้ CourseBox มีการจัดวางกึ่งกลางทั้งตัว */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  /* &:hover {
    transform: scale(1.02);
  } */
`;

const CourseItem = styled.div`
  margin-bottom: 15px;
  color: black;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NavigationButton = styled.button`
  background-color: #4caf50;
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

const CourseList = ({ courses }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCourses = filteredCourses.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setPage(page + 1);
    setSelectedCourse(null);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    setSelectedCourse(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
    setSelectedCourse(null);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseDialog = () => {
    setSelectedCourse(null);
  };

  return (
    <CenteredContainer>
      <h2 style={{ textAlign: 'center', color: 'black' }}>รายวิชาทั้งหมด</h2>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="ค้าหา...(ชื่อวิชา,รหัสวิชา)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      <CourseContainer>
        {visibleCourses.map((course) => (
          <CourseBox key={course.id} onClick={() => handleCourseClick(course)}>
            <CourseItem>
              <strong>รหัสวิชา:</strong> {course.courseID}
            </CourseItem>
            <CourseItem>
              <strong>ชื่อวิชา:</strong> {course.courseName}
            </CourseItem>
            <CourseItem>
              <strong>หน่วยกิต:</strong> {course.credit}
            </CourseItem>
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

      {/* Dialog Card */}
      {selectedCourse && (
        <CourseDialog course={selectedCourse} onClose={handleCloseDialog} />
      )}
    </CenteredContainer>
  );
};

export default CourseList;