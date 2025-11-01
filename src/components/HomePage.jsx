import React, { useState, useEffect } from 'react';
import { Music, TrendingUp, Heart, Disc } from 'lucide-react';
import GenreCard from './GenreCard';
import DetailCard from './DetailCard';
import '../styles/HomePage.css';

const HomePage = ({ onPlayTrack, onAddToPlaylist, currentTrack, isPlaying }) => {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreTracks, setGenreTracks] = useState([]);

  // Genre list dengan keywords untuk iTunes API
  const genres = [
    { id: 1, name: 'Pop', icon: Music, keyword: 'pop', color: '#ec4899' },
    { id: 2, name: 'Rock', icon: Disc, keyword: 'rock', color: '#f97316' },
    { id: 3, name: 'Jazz', icon: Heart, keyword: 'jazz', color: '#8b5cf6' },
    { id: 4, name: 'Electronic', icon: TrendingUp, keyword: 'electronic', color: '#06b6d4' },
    { id: 5, name: 'Hip Hop', icon: Music, keyword: 'hip hop', color: '#eab308' },
    { id: 6, name: 'Classical', icon: Heart, keyword: 'classical', color: '#10b981' },
    { id: 7, name: 'R&B', icon: Disc, keyword: 'r&b', color: '#6366f1' },
    { id: 8, name: 'Country', icon: Music, keyword: 'country', color: '#f59e0b' },
  ];

  useEffect(() => {
    fetchTrendingTracks();
  }, []);

  // Fetch trending tracks (popular songs)
  const fetchTrendingTracks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=top+hits+2024&media=music&entity=song&limit=20`
      );
      const data = await response.json();
      
      const tracks = data.results.map(track => ({
        trackId: track.trackId,
        trackName: track.trackName,
        artistName: track.artistName,
        artworkUrl100: track.artworkUrl100,
        previewUrl: track.previewUrl,
        trackPrice: track.trackPrice,
        releaseDate: track.releaseDate,
        kind: track.kind
      }));
      
      setTrendingTracks(tracks);
    } catch (error) {
      console.error('Error fetching trending tracks:', error);
    }
    setLoading(false);
  };

  // Fetch tracks by genre
  const fetchGenreTracks = async (genre) => {
    setSelectedGenre(genre);
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(genre.keyword)}&media=music&entity=song&limit=30`
      );
      const data = await response.json();
      
      const tracks = data.results.map(track => ({
        trackId: track.trackId,
        trackName: track.trackName,
        artistName: track.artistName,
        artworkUrl100: track.artworkUrl100,
        previewUrl: track.previewUrl,
        trackPrice: track.trackPrice,
        releaseDate: track.releaseDate,
        kind: track.kind
      }));
      
      setGenreTracks(tracks);
    } catch (error) {
      console.error('Error fetching genre tracks:', error);
    }
    setLoading(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Sound</h1>
          <p className="hero-subtitle">
            Explore millions of songs from your favorite artists
          </p>
        </div>
      </div>

      {/* Genres Section */}
      <div className="section">
        <h2 className="section-title">
          <Music size={24} />
          Browse by Genre
        </h2>
        <div className="genres-grid">
          {genres.map(genre => (
            <GenreCard
              key={genre.id}
              genre={genre}
              onClick={() => fetchGenreTracks(genre)}
              isSelected={selectedGenre?.id === genre.id}
            />
          ))}
        </div>
      </div>

      {/* Selected Genre Tracks */}
      {selectedGenre && (
        <div className="section">
          <h2 className="section-title">
            <TrendingUp size={24} />
            {selectedGenre.name} Music
          </h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="tracks-grid">
              {genreTracks.map(track => (
                <DetailCard
                  key={track.trackId}
                  item={track}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPlayTrack={onPlayTrack}
                  onAddToPlaylist={onAddToPlaylist}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Trending Section */}
      <div className="section">
        <h2 className="section-title">
          <TrendingUp size={24} />
          Trending Now
        </h2>
        {loading && !selectedGenre ? (
          <div className="loading">Loading trending tracks...</div>
        ) : (
          <div className="tracks-grid">
            {trendingTracks.map(track => (
              <DetailCard
                key={track.trackId}
                item={track}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayTrack={onPlayTrack}
                onAddToPlaylist={onAddToPlaylist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;