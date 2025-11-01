import React from 'react';
import { Music } from 'lucide-react';
import DetailCard from './DetailCard';
import '../styles/DataTable.css';

const DataTable = ({ 
  results, 
  currentTrack, 
  isPlaying, 
  onPlayTrack, 
  onAddToPlaylist 
}) => {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <Music size={64} className="empty-state-icon" />
        <p className="empty-state-text">
          Search for your favorite music, albums, or artists
        </p>
      </div>
    );
  }

  return (
    <div className="data-table">
      {results.map((item) => (
        <DetailCard
          key={item.trackId || item.collectionId}
          item={item}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayTrack={onPlayTrack}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
    </div>
  );
};

export default DataTable;