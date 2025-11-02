import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import '../styles/AudioPlayer.css';

const AudioPlayer = ({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  currentTime, 
  duration, 
  onSeek, 
  volume, 
  onVolumeChange, 
  isMuted, 
  onToggleMute 
}) => {
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  return (
    <div className="audio-player">
      {/* Progress Bar at Top */}
      <div 
        className="progress-bar-wrapper"
        onClick={handleProgressClick}
      >
        <div 
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>

      <div className="player-container">
        {/* Track Info - Left */}
        <div className="track-info">
          <img
            src={currentTrack.artworkUrl100}
            alt={currentTrack.trackName}
            className="player-artwork"
          />
          <div className="track-details">
            <p className="track-name">{currentTrack.trackName}</p>
            <p className="artist-name">{currentTrack.artistName}</p>
          </div>
        </div>

        {/* Playback Controls - Center */}
        <div className="center-controls">
          <div className="playback-controls">
            <button 
              onClick={onPrevious} 
              className="control-button"
              aria-label="Previous track"
            >
              <SkipBack size={24} />
            </button>
            
            <button 
              onClick={onPlayPause} 
              className="play-button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button 
              onClick={onNext} 
              className="control-button"
              aria-label="Next track"
            >
              <SkipForward size={24} />
            </button>
          </div>
          
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Controls - Right */}
        <div className="volume-controls">
          <button 
            onClick={onToggleMute} 
            className="volume-button"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseInt(e.target.value))}
            className="volume-slider"
            aria-label="Volume"
            style={{
              background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;