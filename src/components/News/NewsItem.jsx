//NewItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ id, title, content, imageSrc }) => {
  return (
    <Link to={`/news/${id}`} style={{ textDecoration: 'none' }}>
      <div style={newsItemStyle} className="news-item">
        <h2>{title}</h2>
        {imageSrc && <img src={imageSrc} alt={title} style={imageStyle} />}
        <p>{content}</p>
      </div>
    </Link>
  );
};

const newsItemStyle = {
  color: 'black',
  width: '300px',
  margin: '10px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  whiteSpace: 'pre-line',
  overflow: 'hidden', 
};


const imageStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: '10px',
};

export default NewsItem;
