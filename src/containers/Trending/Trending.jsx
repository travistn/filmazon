import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Trending.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const formatDate = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8);
  return `${month}/${day}/${year}`;
};

const Trending = ({ setMovieId }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [day, setDay] = useState('day');
  const navigate = useNavigate();

  const searchTrendingMovies = async (day) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${day}?api_key=${apiKey}`
    );

    const data = await response.json();

    setTrendingMovies(data.results);
  };

  useEffect(() => {
    searchTrendingMovies(day);
  }, [day]);

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setMovieId(id);

    navigate(`/movie/${id}`);
  };

  return (
    <div className='trending__container'>
      <div className='trending__header'>
        <h2 className='trending__header-title'>Trending Movies</h2>

        <div className='selector__wrapper'>
          <div className='selector'>
            <div
              className={`selected ${day === 'day' ? 'active' : ''}`}
              onClick={() => setDay('day')}>
              <h4>Today</h4>
            </div>
            <div
              className={`selected ${day === 'week' ? 'active' : ''}`}
              onClick={() => setDay('week')}>
              <h4>This Week</h4>
            </div>
          </div>
        </div>
      </div>

      <div className='trending__list'>
        {trendingMovies?.map((movie) => (
          <div key={movie.id}>
            <div className='trending__card'>
              <img
                className='trending__card-image'
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt='movie-poster'
                onClick={clickHandler}
                value={movie?.id}
              />
              <div className='trending__card-content'>
                <h2 onClick={clickHandler} value={movie?.id}>
                  {movie?.title}
                </h2>
                <p>{`${formatDate(movie?.release_date)}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
