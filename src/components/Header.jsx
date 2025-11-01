import React from 'react';
import { Music, Home, ListMusic } from 'lucide-react';
import SearchForm from './SearchForm';
import '../styles/Header.css';

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  mediaType, 
  setMediaType, 
  onSearch, 
  loading, 
  sortBy, 
  setSortBy, 
  playlistCount,
  currentPage,
  setCurrentPage
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-top">
          <h1 className="header-title">MusikKu - Music Explorer</h1>
          
          <div className="header-nav">
            <button
              onClick={() => setCurrentPage('home')}
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            >
              <Home size={20} />
              Home
            </button>
            
            <button
              onClick={() => setCurrentPage('playlist')}
              className={`nav-button ${currentPage === 'playlist' ? 'active' : ''}`}
            >
              <ListMusic size={20} />
              Playlist ({playlistCount})
            </button>
          </div>
        </div>
        
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mediaType={mediaType}
          setMediaType={setMediaType}
          onSearch={onSearch}
          loading={loading}
          handleKeyPress={handleKeyPress}
        />

        {/* Sort hanya muncul di halaman search */}
        {currentPage === 'search' && (
          <div className="header-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Release Date</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;