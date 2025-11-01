import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DataTable from './components/DataTable';
import PlaylistPage from './components/PlaylistPage';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    loadPlaylist();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const loadPlaylist = () => {
    try {
      const stored = localStorage.getItem('music-playlist');
      if (stored) {
        const parsedPlaylist = JSON.parse(stored);
        setPlaylist(parsedPlaylist);
        console.log('Playlist loaded:', parsedPlaylist.length, 'tracks');
      }
    } catch (error) {
      console.error('Failed to load playlist:', error);
      setPlaylist([]);
    }
  };

  const savePlaylist = (newPlaylist) => {
    try {
      localStorage.setItem('music-playlist', JSON.stringify(newPlaylist));
      console.log('Playlist saved:', newPlaylist.length, 'tracks');
    } catch (error) {
      console.error('Failed to save playlist:', error);
    }
  };

  const searchMusic = async () => {
    if (!searchTerm.trim()) return;
    
    setCurrentPage('search');
    setLoading(true);
    
    try {
      const term = encodeURIComponent(searchTerm);
      const media = mediaType === 'all' ? 'music' : mediaType;
      const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&media=${media}&entity=song&limit=50`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  const playTrack = (track) => {
    if (!track.previewUrl) return;
    
    if (currentTrack?.trackId === track.trackId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = track.previewUrl;
          audioRef.current.play().catch(err => {
            console.error('Play error:', err);
            setIsPlaying(false);
          });
        }
      }, 100);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex(t => t.trackId === currentTrack?.trackId);
    if (currentIndex < playlist.length - 1) {
      playTrack(playlist[currentIndex + 1]);
    } else if (playlist.length > 0) {
      playTrack(playlist[0]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = playlist.findIndex(t => t.trackId === currentTrack?.trackId);
    if (currentIndex > 0) {
      playTrack(playlist[currentIndex - 1]);
    } else if (playlist.length > 0) {
      playTrack(playlist[playlist.length - 1]);
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const addToPlaylist = (track) => {
    if (!track.previewUrl) return;
    
    const exists = playlist.find(t => t.trackId === track.trackId);
    if (exists) {
      alert('Track already in playlist!');
      return;
    }
    
    const newPlaylist = [...playlist, track];
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
  };

  const removeFromPlaylist = (trackId) => {
    const newPlaylist = playlist.filter(t => t.trackId !== trackId);
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
    
    if (currentTrack?.trackId === trackId) {
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    savePlaylist([]);
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const sortResults = (data) => {
    const sorted = [...data];
    if (sortBy === 'price') {
      return sorted.sort((a, b) => (a.trackPrice || 0) - (b.trackPrice || 0));
    } else if (sortBy === 'date') {
      return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }
    return sorted;
  };

  const displayResults = sortResults(results);

  return (
    <div className="app-container">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="blur-sphere blur-sphere-1"></div>
        <div className="blur-sphere blur-sphere-2"></div>
        <div className="blur-sphere blur-sphere-3"></div>
      </div>

      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mediaType={mediaType}
        setMediaType={setMediaType}
        onSearch={searchMusic}
        loading={loading}
        sortBy={sortBy}
        setSortBy={setSortBy}
        playlistCount={playlist.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content */}
      <div className="main-content">
        {currentPage === 'home' && (
          <HomePage
            onPlayTrack={playTrack}
            onAddToPlaylist={addToPlaylist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        )}

        {currentPage === 'search' && (
          <DataTable
            results={displayResults}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={playTrack}
            onAddToPlaylist={addToPlaylist}
          />
        )}

        {currentPage === 'playlist' && (
          <PlaylistPage
            playlist={playlist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={playTrack}
            onRemoveFromPlaylist={removeFromPlaylist}
            onClearPlaylist={clearPlaylist}
          />
        )}
      </div>

      {/* Audio Player */}
      {currentTrack && (
        <AudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => {
          setIsPlaying(false);
          handleNext();
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
}

export default App;