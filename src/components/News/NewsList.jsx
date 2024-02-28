//NewList.jsx

import React from 'react';
import NewsItem from './NewsItem';

// Define styles as constants
const homeContainerStyle = {
  textAlign: 'center',
  margin: '20px',
};

const newsListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
};

const NewsList = () => {
  const newsData = [
    { id: 1, title: 'ข่าวน่าตื่นเต้นในวิทยาลัย', content: '', imageSrc: '/src/assets/news1.jpg' },
    { id: 2, title: 'ความสำเร็จของนักศึกษา', content: '......................................................................................................................................................................................................................', imageSrc: '/src/assets/news2.jpeg' },
    { id: 3, title: 'กิจกรรมที่กำลังจะมี', content: '...', imageSrc: '/src/assets/news3.jpg' },
    { id: 4, title: 'กิจกรรมที่กำลังจะมี', content: '...', imageSrc: '/src/assets/news4.jpg' },
    // Add more news data as needed
  ];

  return (
    <div style={homeContainerStyle}>
      <div style={newsListStyle} className="news-list">
        {newsData.map((news) => (
          <NewsItem key={news.id} title={news.title} content={news.content} imageSrc={news.imageSrc} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
