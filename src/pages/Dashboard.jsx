// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin-top: 125px;
  margin-left: auto;
  margin-right: auto;
`;

const EnrollmentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const EnrollmentBox = styled.div`
  width: 300px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const EnrollmentItem = styled.div`
  margin-bottom: 15px;
  color: black;
`;

const CancelButton = styled.button`
  background-color: #f00;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const PdfButton = styled.button`
  background-color: lightgreen;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NextButton = styled.button`
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

const StickyFooter = styled.footer`
background-color: rgba(0, 0, 0, 0);
  color: #fff;
  padding: 10px;
  text-align: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Dashboard = ({ currentUser }) => {
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 3;

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

  const handleCancelEnrollment = async (enrollmentId) => {
    try {
      const response = await fetch(`http://localhost:3001/enrollment/${enrollmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserEnrollments((prevEnrollments) =>
          prevEnrollments.filter((enrollment) => enrollment.id !== enrollmentId)
        );
        alert('ยกเลิกการลงทะเบียนเรียบร้อยแล้ว');
      } else {
        const errorMessage = await response.json();
        console.error(`Failed to cancel enrollment: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during enrollment cancellation:', error);
    }
  };

  const totalPages = Math.ceil(userEnrollments.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredEnrollments = userEnrollments.filter(
    (enrollment) =>
      enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleEnrollments = filteredEnrollments.slice(startIndex, endIndex);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Add student information as subtitles
    pdf.setFont('THSarabunNew', 'normal');
    pdf.setFontSize(12);
    const subtitle = `Nisit ID: ${currentUser.StuID}`;
    pdf.text(subtitle, 20, 20);
  
    // Logo
    const imgPath = './src/assets/mcu.png';
    const imgWidth = 50;
    const imgHeight = 50;
    const centerX = (pdf.internal.pageSize.width - imgWidth) / 2;
    const centerY = 50; // Adjusted for the subtitle
    pdf.addImage(imgPath, 'JPEG', centerX, centerY, imgWidth, imgHeight);
  
    // Title
    const title = 'Course Registration Results Report.';
    const spaceAfterImage = 20;
    const textY = centerY + imgHeight + spaceAfterImage;
    pdf.setFont('THSarabunNew', 'normal');
    pdf.setFontSize(14);
    const textWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const textX = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(title, textX, textY);
  
    // Separator Line
    pdf.setLineWidth(0.5);
    pdf.line(20, textY + 13, pdf.internal.pageSize.width - 20, textY + 13);
  
    const itemsPerPage = 15; // Adjust as needed
    const totalPages = Math.ceil(visibleEnrollments.length / itemsPerPage);
  
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      // Table Data for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const tableData = visibleEnrollments.slice(startIndex, endIndex).map((enrollment, index) => [
        (currentPage - 1) * itemsPerPage + index + 1, // Sequence number
        enrollment.courseID,
        enrollment.courseName,
        enrollment.credit
      ]);
  
      // Table
      pdf.autoTable({
        head: [['No.', 'Course ID', 'Course Name', 'Credit']],
        body: tableData,
        startY: currentPage === 1 ? textY + 23 : 10, // Start lower on subsequent pages
        styles: {
          font: 'THSarabunNew',
          fontSize: 12,
          textColor: [44, 62, 80],
          halign: 'center',
          valign: 'middle'
        },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        bodyStyles: { fillColor: 255 }
      });
  
      // Add a new page if there are more pages
      if (currentPage < totalPages) {
        pdf.addPage();
      }
    }
  
    // Save PDF with student ID
    pdf.save(`STD_ENROLL_REPORT_${currentUser.StuID}`);
  };
  
  

  return (
    <CenteredContainer>
      <h2 style={{ textAlign: 'center', color: 'black' }}>รายวิชาที่คุณลงทะเบียน</h2>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="ค้าหา...(ชื่อวิชา,รหัสวิชา)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      <EnrollmentContainer>
        {visibleEnrollments.length > 0 ? (
          visibleEnrollments.map((enrollment) => (
            <EnrollmentBox key={enrollment.id}>
              <EnrollmentItem>
                <strong>รหัสวิชา:</strong> {enrollment.courseID}
              </EnrollmentItem>
              <EnrollmentItem>
                <strong>ชื่อวิชา:</strong> {enrollment.courseName}
              </EnrollmentItem>
              <EnrollmentItem>
                <strong>หน่วยกิต:</strong> {enrollment.credit}
              </EnrollmentItem>
              <CancelButton onClick={() => handleCancelEnrollment(enrollment.id)}>
                ยกเลิกการลงทะเบียน
              </CancelButton>
            </EnrollmentBox>
          ))
        ) : (
          <h2 style={{ color: 'red' }}>คุณยังไม่มีการลงทะเบียนเรียน</h2>
        )}
        <PaginationContainer>
          <NextButton onClick={handlePrevPage} disabled={currentPage === 1}>
            ย้อนกลับ
          </NextButton>
          <NextButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            หน้าถัดไป
          </NextButton>
        </PaginationContainer>
      </EnrollmentContainer>

      <StickyFooter>
      {visibleEnrollments.length > 0 && (
          <PdfButton onClick={generatePDF}>
            ดาวน์โหลดข้อมูลลงทะเบียนเป็น PDF
          </PdfButton>
        )}
      </StickyFooter>
    </CenteredContainer>
  );
};

export default Dashboard;
