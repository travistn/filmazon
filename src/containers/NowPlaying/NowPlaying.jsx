import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './NowPlaying.css';
import { apiKey, formatDate } from '../../utils/Reuseables';

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
      .then((res) => setNowPlaying(res.data.results));
  }, []);

  return (
    <div className='nowPlaying__container'>
      <div className='nowPlaying-header'>
        <h2>Now Playing</h2>
      </div>
      <div className='nowPlaying__list'>
        {nowPlaying?.map((movie) => (
          <div key={movie.id}>
            <div className='nowPlaying__card'>
              <img
                className='nowPlaying__card-image'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt='movie-poster'
                onClick={() => navigate(`/movie/${movie?.id}`)}
              />
              <div className='nowPlaying__card-content'>
                <h2 onClick={() => navigate(`/movie/${movie?.id}`)}>{movie.title}</h2>
                <p>{formatDate(movie.release_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
