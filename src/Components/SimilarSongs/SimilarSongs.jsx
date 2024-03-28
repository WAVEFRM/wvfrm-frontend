import React, { useState, useEffect } from 'react';

const SimilarSongs = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetching random images from a free image API
                const response = await fetch('https://api.unsplash.com/photos/random?count=5&client_id=i7Wv2sfSUcJcnIjKgL4iOEzf7Y9jlhpqeQRRYkT3oQU');
                const data = await response.json();
                const imageUrls = data.map(item => item.urls.regular);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    return (
        <div className="carousel-container">
           
            <div className="carousel" style={{width:'1',display:'flex',height:'2',}}>
                {images.map((imageUrl, index) => (
                    <div key={index} className={`card ${index === currentIndex ? 'active' : ''}`} style={{width:'fit-content',display:'inline-block',height:'fit-content',}}>
                        <img src={imageUrl} alt={`Image ${index + 1}`} style={{width:'50%',}} />
                    </div>
                ))}
            </div>
            <button onClick={handlePrev}>Prev</button> <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default SimilarSongs;
