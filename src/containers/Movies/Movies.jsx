import { useState, useEffect } from 'react';
import axios from 'axios';

import './Movies.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import Sort from '../../components/Sort/Sort';
import { apiKey } from '../../utils/Reuseables';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const addPage = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => setMovies((prevState) => prevState.concat(res.data.results)));
  }, [page]);

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
