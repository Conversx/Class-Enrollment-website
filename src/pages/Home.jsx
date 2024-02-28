import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const styles = {
  newsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },
  newsCard: {
    backgroundColor: 'white',
    color: 'black',
    padding: '5px',
    margin: '5px',
    width: '500px',
    height: '400px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1,
    overflow: 'hidden',
    maxHeight: '1500px',
    marginBottom: '30px',
  },
  newsImage: {
    width: '100%',
    height: '250px', // Adjust the height as needed
    objectFit: 'cover',
    objectPosition: 'center', // Center the image within the container
    marginBottom: '10px',
    borderRadius: '8px',
  },
};

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/src/assets/newsData.json')
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error('Error fetching news data:', error));
  }, []);

  const handleNextNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const handlePrevNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  useEffect(() => {
    // Automatically slide to the next news every 5 seconds
    const intervalId = setInterval(() => {
      handleNextNews();
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentNewsIndex, newsData.length]);

  const currentNews = newsData[currentNewsIndex];

  return (
    <div>
      <h1 style={{ color: 'black', textAlign: 'center', marginTop:'100px' }}>ข่าวนิสิต</h1>
      <div className="news-container" style={styles.newsContainer}>
        {currentNews && (
          <Link to={`/news/${currentNews.id}`} style={{ textDecoration: 'none' }}>
            <div
              style={{ ...styles.newsCard }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img src={currentNews.image} alt={currentNews.title} style={styles.newsImage} />
              <h2>{currentNews.title}</h2>
            </div>
          </Link>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <button onClick={handlePrevNews} style={{ marginRight: '80px', width:'90px' }}>
            <FaArrowLeft />
          </button>
          <button onClick={handleNextNews} style={{ width:'90px' }}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
