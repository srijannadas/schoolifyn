import React, { useState } from 'react';
import './sm.css'; 

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const subjects = [
        { title: 'Subject 1', subheading: 'Subheading 1' },
        { title: 'Subject 2', subheading: 'Subheading 2' },
        { title: 'Subject 3', subheading: 'Subheading 3' },
        { title: 'Subject 4', subheading: 'Subheading 4' },
        { title: 'Subject 5', subheading: 'Subheading 5' },
        { title: 'Subject 6', subheading: 'Subheading 6' },
        { title: 'Subject 7', subheading: 'Subheading 7' }
    ]; 

    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33ffee', '#ee33ff', '#ffff33', '#33ffff']; // Colors for each subject

    const scrollLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const scrollRight = () => {
        if (currentIndex < subjects.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const getCardStyle = (index) => {
        return {
            backgroundColor: colors[index % colors.length] 
        };
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 text-center"> 
                    <h2 className="heading">Study Material</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card-container">
                        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
                        <div className="cards-wrapper">
                            <div className="cards" style={{ transform: `translateX(-${currentIndex * (100 / subjects.length)}%)` }}>
                                {subjects.map((subject, index) => (
                                    <div key={index} className="card" style={getCardStyle(index)}>
                                        <h3>{subject.title}</h3>
                                        <p>{subject.subheading}</p>
                                    </div> 
                                ))}
                            </div>
                        </div>
                        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
