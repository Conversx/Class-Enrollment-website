// NewsDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '1980px',
    margin: '0 auto',
    marginTop: '175px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: 'white',
    color: 'black',
    width: '690px',
    minHeight: '700px', // Set a minimum height
    height: 'auto', // Allow it to stretch according to content
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  image: {
    width: '100%', // Set width to 100% to cover the container
    height: '100%', // Set height to 100% to cover the container
    objectFit: 'cover', // Ensure the image covers the entire container
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
};

const NewsDetails = () => {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('/src/assets/newsData.json');
        const data = await response.json();
        const newsItem = data.find((news) => news.id === parseInt(id, 10));

        if (!newsItem) {
          console.error('News not found');
          // Handle not found, redirect, or show an error message
          return;
        }

        setSelectedNews(newsItem);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, [id]);

  if (!selectedNews) {
    return <div>Loading...</div>;
  }

  const { title, content, image } = selectedNews;

  return (
    <div style={styles.container}>
      <h1>{title}</h1>
      <div style={styles.imageContainer}>
        <img src={image} alt={`Image for ${title}`} style={styles.image} />
      </div>
      <p style={styles.content}>{content}</p>
    </div>
  );
};

export default NewsDetails;
