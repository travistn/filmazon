import { useState, useEffect, useCallback } from 'react';

import MovieCard from '../../components/MovieCard/MovieCard';
import Sort from '../../components/Sort/Sort';
import './Movies.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Movies = ({ setMovieId }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getPopularMovies = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    );

    const data = await response.json();

    setMovies((prevState) => prevState.concat(data.results));
  }, [page]);

  const addPage = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

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
                key={movie?.id}
              />
            ))}
            <div className='movies-loadMore'>
              <button onClick={addPage}>Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
