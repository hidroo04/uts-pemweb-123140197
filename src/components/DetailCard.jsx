import React from 'react';
import { Play, Pause, Plus, DollarSign, Clock } from 'lucide-react';
import '../styles/DetailCard.css';

const DetailCard = ({ 
  item, 
  currentTrack, 
  isPlaying, 
  onPlayTrack, 
  onAddToPlaylist 
}) => {
  const hasPreview = item.previewUrl && item.kind === 'song';
  
  return (
    <div className="detail-card">
      <div className="card-content">
        <div className="artwork-wrapper">
          <img
            src={item.artworkUrl100}
            alt={item.trackName || item.collectionName}
            className="card-artwork"
          />
          {hasPreview && (
            <button
              onClick={() => onPlayTrack(item)}
              className="play-overlay"
            >
              {currentTrack?.trackId === item.trackId && isPlaying ? (
                <Pause size={32} />
              ) : (
                <Play size={32} />
              )}
            </button>
          )}
        </div>
        
        <div className="card-info">
          <h3 className="card-title">
            {item.trackName || item.collectionName}
          </h3>
          <p className="card-artist">{item.artistName}</p>
          
          <div className="card-meta">
            {item.trackPrice && (
              <span className="meta-item">
                <DollarSign size={12} />
                {item.trackPrice}
              </span>
            )}
            {item.releaseDate && (
              <span className="meta-item">
                <Clock size={12} />
                {new Date(item.releaseDate).getFullYear()}
              </span>
            )}
          </div>

          {hasPreview && (
            <button
              onClick={() => onAddToPlaylist(item)}
              className="add-button"
            >
              <Plus size={14} />
              Add to Playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;