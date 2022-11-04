import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Trending.css';
import { apiKey, formatDate } from '../../utils/Reuseables';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [day, setDay] = useState('day');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/${day}?api_key=${apiKey}`)
      .then((res) => setTrendingMovies(res.data.results));
  }, [day]);

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
                onClick={() => navigate(`/movie/${movie?.id}`)}
              />
              <div className='trending__card-content'>
                <h2 onClick={() => navigate(`/movie/${movie?.id}`)}>{movie?.title}</h2>
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
