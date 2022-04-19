import { useState, useEffect } from 'react';

import MovieCard from '../../components/MovieCard/MovieCard';
import Sort from '../../components/Sort/Sort';
import './Movies.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Movies = ({ setMovieId }) => {
  const [movies, setMovies] = useState();

  const getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    const data = await response.json();

    setMovies(data.results);
  };

  console.log(movies);

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className='movies__wrapper'>
      <div className='movies__container'>
        <div className='movies-header'>
          <h4>Popular Movies</h4>
        </div>
        <div className='movies-content'>
          <div className='movies-sort-column'>
            <Sort />
          </div>
          <div className='movies-column'>
            {movies?.map((movie) => (
              <MovieCard
                image={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie?.poster_path}`}
                title={movie?.title}
                releaseDate={movie?.release_date === null ? 'TBA' : movie?.release_date}
                movieId={movie?.id}
                setMovieId={setMovieId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
