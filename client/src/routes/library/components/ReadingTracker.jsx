import React, { useState } from 'react';

const ReadingTracker = () => {
  const generateReadingData = () => {
    const data = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const randomRead = Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0;
      data.push({
        date: new Date(d),
        count: randomRead
      });
    }
    return data;
  };

  const [readingData] = useState(generateReadingData());
  const daysRead = readingData.filter(d => d.count > 0).length;

  const weeks = [];
  let currentWeek = [];
  
  readingData.forEach((day, i) => {
    currentWeek.push(day);
    if (day.date.getDay() === 6 || i === readingData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getColor = (count) => {
    if (count === 0) return '#e8d5c4';
    if (count === 1) return '#c9a98a';
    if (count === 2) return '#a67c52';
    return '#8B4513';
  };

  return (
    <div className="reading-tracker-container">
      <div className="reading-tracker-header">
        <h2 className="reading-tracker-title">Reading Activity</h2>
        <p className="reading-tracker-stats">
          <span className="days-count">{daysRead} days</span> of reading this year
        </p>
      </div>
      <div className="reading-tracker-graph">
        <div className="reading-tracker-weeks">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="reading-tracker-week">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className="reading-tracker-day"
                  style={{backgroundColor: getColor(day.count)}}
                  title={`${day.date.toLocaleDateString()}: ${day.count} ${day.count === 1 ? 'session' : 'sessions'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="reading-tracker-legend">
        <span className="reading-tracker-legend-label">Less</span>
        <div className="reading-tracker-legend-colors">
          <div className="reading-tracker-legend-box" style={{backgroundColor: '#e8d5c4'}} />
          <div className="reading-tracker-legend-box" style={{backgroundColor: '#c9a98a'}} />
          <div className="reading-tracker-legend-box" style={{backgroundColor: '#a67c52'}} />
          <div className="reading-tracker-legend-box" style={{backgroundColor: '#8B4513'}} />
        </div>
        <span className="reading-tracker-legend-label">More</span>
      </div>
    </div>
  );
};

export default ReadingTracker;