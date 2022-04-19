import { useState, useEffect, useCallback } from 'react';

import Search from '../Search/Search';
import './Header.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Header = ({ setMovies, searchTerm, setSearchTerm }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});

  const getTrendingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );

    const data = await response.json();

    setMoviesList(data.results);
  };

  const getRandomizedMovie = useCallback(async () => {
    const random = await moviesList[Math.floor(Math.random() * moviesList.length)];
    setRandomMovie(random);
  }, [moviesList]);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    getRandomizedMovie();
  }, [getRandomizedMovie]);

  return (
    <div className='header__wrapper'>
      <div
        className='header__container'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${randomMovie?.backdrop_path})`,
        }}>
        <div className='header-content'>
          <h3>Welcome.</h3>
          <h4>Millions of movies, TV shows, and people to discover. Explore now.</h4>
        </div>
        <Search setMovies={setMovies} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
};

export default Header;
