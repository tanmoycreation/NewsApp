import React from 'react';

const Card = ({ data }) => {
  console.log(data);

  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        } else {
          return (
            <div key={index} className='card'>
              <img src={curItem.urlToImage} alt={curItem.title} />
              <div className='content'>
                <button 
                  className='title' 
                  onClick={() => window.open(curItem.url)} 
                  style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {curItem.title}
                </button>
                <p>{curItem.description}</p>
                <button onClick={() => readMore(curItem.url)}>
                  Read More
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
