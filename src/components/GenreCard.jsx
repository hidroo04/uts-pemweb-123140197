import React from 'react';
import '../styles/GenreCard.css';

const GenreCard = ({ genre, onClick, isSelected }) => {
  const Icon = genre.icon;

  return (
    <div
      className={`genre-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${genre.color}dd, ${genre.color})`
      }}
    >
      <Icon size={32} className="genre-icon" />
      <h3 className="genre-name">{genre.name}</h3>
    </div>
  );
};

export default GenreCard;