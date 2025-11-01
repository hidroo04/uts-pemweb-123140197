import React from 'react';
import { Search } from 'lucide-react';
import '../styles/SearchForm.css';

const SearchForm = ({ 
  searchTerm, 
  setSearchTerm, 
  mediaType, 
  setMediaType, 
  onSearch, 
  loading, 
  handleKeyPress 
}) => {
  return (
    <div className="search-form">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search for music, albums, or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
      </div>
      
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        className="media-select"
      >
        <option value="all">All</option>
        <option value="music">Music</option>
        <option value="album">Album</option>
        <option value="musicArtist">Artist</option>
      </select>
      
      <button
        onClick={onSearch}
        disabled={loading}
        className="search-button"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchForm;