import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Search = ({ searchTerm, setSearchTerm, setMovies }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieSearchClick = () => {
    getSearch(searchTerm);
    navigate(`/search/movie/${searchTerm}`);

    document.getElementById('searchInput').value = '';
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      getSearch(searchTerm);
      navigate(`/search/movie/${searchTerm}`);

      document.getElementById('searchInput').value = '';
    }
  };

  const getSearch = useCallback(
    async (title) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`
      );

      const data = await response.json();

      setMovies(data.results);
    },
    [setMovies]
  );

  useEffect(() => {
    getSearch(searchTerm);
  }, [searchTerm, getSearch]);

  return (
    <div className='search'>
      <div className='searchBar'>
        <label className='search-label'>
          <input
            className='search-textField'
            type='text'
            placeholder='Search for a movie, tv show, person...'
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            id='searchInput'
          />
        </label>
        <input
          className='search-button'
          type='button'
          value='Search'
          onClick={handleMovieSearchClick}
        />
      </div>
    </div>
  );
};

export default Search;

/* 
  return (
    <div className='search'>
      <div className='searchBar'>
        <input
          placeholder='Search a movie...'
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          id='searchInput'
        />
        <AiOutlineSearch className='searchBar-icon' onClick={handleMovieSearchClick} />
      </div>
    </div>
  );
*/
