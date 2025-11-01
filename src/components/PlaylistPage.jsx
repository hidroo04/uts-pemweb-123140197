import React, { useState } from 'react';
import { Play, Pause, X, Music, Clock, Trash2 } from 'lucide-react';
import '../styles/PlaylistPage.css';

const PlaylistPage = ({ 
  playlist, 
  currentTrack, 
  isPlaying, 
  onPlayTrack, 
  onRemoveFromPlaylist,
  onClearPlaylist 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trackToDelete, setTrackToDelete] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleDeleteClick = (track) => {
    setTrackToDelete(track);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (trackToDelete) {
      onRemoveFromPlaylist(trackToDelete.trackId);
      setShowDeleteModal(false);
      setTrackToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTrackToDelete(null);
  };

  const handleClearClick = () => {
    setShowClearModal(true);
  };

  const handleConfirmClear = () => {
    onClearPlaylist();
    setShowClearModal(false);
  };

  const handleCancelClear = () => {
    setShowClearModal(false);
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    const total = playlist.reduce((acc, track) => acc + (track.trackTimeMillis || 30000), 0);
    const minutes = Math.floor(total / 60000);
    return `${minutes} min`;
  };

  return (
    <div className="playlist-page">
      {/* Playlist Header */}
      <div className="playlist-page-header">
        <div className="playlist-header-content">
          <div className="playlist-cover">
            {playlist.length > 0 ? (
              <div className="playlist-cover-grid">
                {playlist.slice(0, 4).map((track, index) => (
                  <img 
                    key={index}
                    src={track.artworkUrl100} 
                    alt="" 
                    className="playlist-cover-image"
                  />
                ))}
              </div>
            ) : (
              <div className="playlist-cover-empty">
                <Music size={48} />
              </div>
            )}
          </div>
          
          <div className="playlist-header-info">
            <span className="playlist-type">Playlist</span>
            <h1 className="playlist-page-title">My Playlist</h1>
            <div className="playlist-meta">
              <span>{playlist.length} songs</span>
              {playlist.length > 0 && (
                <>
                  <span className="playlist-meta-dot">•</span>
                  <span>{getTotalDuration()}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Controls */}
      {playlist.length > 0 && (
        <div className="playlist-controls-bar">
          <button 
            className="play-all-button"
            onClick={() => onPlayTrack(playlist[0])}
          >
            <Play size={20} fill="currentColor" />
            Play All
          </button>
          <button 
            className="clear-all-button"
            onClick={handleClearClick}
          >
            <Trash2 size={18} />
            Clear All
          </button>
        </div>
      )}

      {/* Playlist Table */}
      {playlist.length > 0 ? (
        <div className="playlist-table-container">
          <table className="playlist-table">
            <thead>
              <tr>
                <th className="th-number">#</th>
                <th className="th-title">Title</th>
                <th className="th-album">Album</th>
                <th className="th-duration">
                  <Clock size={16} />
                </th>
                <th className="th-actions"></th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((track, index) => (
                <tr 
                  key={track.trackId}
                  className={`playlist-row ${currentTrack?.trackId === track.trackId ? 'playing' : ''}`}
                  onDoubleClick={() => onPlayTrack(track)}
                >
                  <td className="td-number">
                    <div className="number-cell">
                      <span className="track-number">{index + 1}</span>
                      <button 
                        className="play-button-cell"
                        onClick={() => onPlayTrack(track)}
                      >
                        {currentTrack?.trackId === track.trackId && isPlaying ? (
                          <Pause size={16} fill="currentColor" />
                        ) : (
                          <Play size={16} fill="currentColor" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="td-title">
                    <div className="title-cell">
                      <img 
                        src={track.artworkUrl100} 
                        alt={track.trackName}
                        className="track-artwork"
                      />
                      <div className="track-info">
                        <div className="track-name">{track.trackName}</div>
                        <div className="track-artist">{track.artistName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-album">
                    <span className="album-name">{track.collectionName || 'Unknown Album'}</span>
                  </td>
                  <td className="td-duration">
                    <span className="duration">{formatDuration(track.trackTimeMillis || 30000)}</span>
                  </td>
                  <td className="td-actions">
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteClick(track)}
                      title="Remove from playlist"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-playlist-page">
          <Music size={64} className="empty-icon" />
          <h2 className="empty-title">Your playlist is empty</h2>
          <p className="empty-subtitle">Add songs to start building your collection</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Remove from Playlist</h3>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                Are you sure you want to remove <strong>{trackToDelete?.trackName}</strong> from your playlist?
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-button cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={handleConfirmDelete}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="modal-overlay" onClick={handleCancelClear}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Clear Playlist</h3>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                Are you sure you want to remove all <strong>{playlist.length} songs</strong> from your playlist? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-button cancel" onClick={handleCancelClear}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={handleConfirmClear}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;