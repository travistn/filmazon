import { useEffect, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import './Search.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Search = () => {
  const navigate = useNavigate();
  let { searchTerm } = useParams();

  const { setMovies, setTvShows, setPeople } = useContext(AppContext);

  const handleInputChange = (e) => {
    searchTerm = e.target.value.split(' ').join('+');
  };

  const handleMovieSearchClick = () => {
    getSearch(searchTerm);
    navigate(`/search&query=${searchTerm}`);

    document.getElementById('searchInput').value = '';
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      getSearch(searchTerm);
      navigate(`/search&query=${searchTerm}`);

      document.getElementById('searchInput').value = '';
    }
  };

  const getSearch = useCallback(
    async (title) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`
      );

      const data = await response.json();

      setMovies(data.results?.filter((movie) => movie?.media_type === 'movie'));
      setTvShows(data.results?.filter((tv) => tv?.media_type === 'tv'));
      setPeople(data.results?.filter((person) => person?.media_type === 'person'));
    },
    [setMovies, setTvShows, setPeople]
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
