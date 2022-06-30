import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NowPlaying.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const formatDate = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8);
  return `${month}/${day}/${year}`;
};

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState();
  const navigate = useNavigate();

  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );

    const data = await response.json();

    setNowPlaying(data.results);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');

    navigate(`movie/${id}`);
  };

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
                onClick={clickHandler}
                value={movie.id}
              />
              <div className='nowPlaying__card-content'>
                <h2 onClick={clickHandler} value={movie.id}>
                  {movie.title}
                </h2>
                <p>{`${formatDate(movie.release_date)}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
