import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './SimilarMovies.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const SimilarMovies = ({ movieId, setMovieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const navigate = useNavigate();

  const getSimilarMovies = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
    );

    const data = await response.json();

    setSimilarMovies(data.results);
  };

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setMovieId(id);

    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    getSimilarMovies(movieId);
  }, [movieId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='similarMovies__wrapper'>
      <div className='similarMovies__container'>
        <h3>Similar Movies</h3>
        <div className='similarMovies__list'>
          {similarMovies?.map((movie) => (
            <div className='similarMovies__card'>
              <img
                src={`https://www.themoviedb.org/t/p/w250_and_h141_face/${movie?.backdrop_path}`}
                alt='movie-poster'
                onClick={clickHandler}
                value={movie?.id}
              />
              <p onClick={clickHandler} value={movie?.id}>
                {movie?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarMovies;
