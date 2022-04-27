import { Fragment, useState } from 'react';

import SearchListCard from '../../components/SearchListCard/SearchListCard';
import './SearchList.css';

const SearchList = ({ movies, setMovieId }) => {
  const [category, setCategory] = useState('movie');

  const sortMovieResults = movies?.filter((movie) => movie?.media_type === 'movie');
  const sortTVResults = movies?.filter((movie) => movie?.media_type === 'tv');

  const changeCategory = (e) => {
    setCategory(e.target.id);
  };

  return (
    <div className='searchList__wrapper'>
      <div className='searchList__container'>
        <div className='searchList__left-column'>
          <div className='results__container'>
            <div className='results-header'>
              <p>Search Results</p>
            </div>
            <div>
              <div className='results-categories'>
                <div className={`results-label ${category === 'movie' ? 'results-selected' : ''}`}>
                  <h5 id='movie' onClick={changeCategory}>
                    Movies
                  </h5>
                  <div
                    className={`results-num ${
                      category === 'movie' ? 'results-num-selected' : 'results-num-unselected'
                    }`}>
                    {sortMovieResults.length}
                  </div>
                </div>
                <div className={`results-label ${category === 'tv' ? 'results-selected' : ''}`}>
                  <h5 id='tv' onClick={changeCategory}>
                    TV Shows
                  </h5>
                  <div
                    className={`results-num ${
                      category === 'tv' ? 'results-num-selected' : 'results-num-unselected'
                    }`}>
                    {sortTVResults.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='searchList__right-column'>
          {category === 'movie' && (
            <>
              {sortMovieResults.map((movie) => (
                <SearchListCard
                  image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${movie?.poster_path}`}
                  title={movie?.title}
                  releaseDate={movie?.release_date}
                  overview={movie?.overview}
                  movieId={movie?.id}
                  setMovieId={setMovieId}
                  key={movie?.id}
                />
              ))}
            </>
          )}
          {category === 'tv' && (
            <>
              {sortTVResults.map((movie) => (
                <SearchListCard
                  image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${movie?.poster_path}`}
                  title={movie?.name}
                  releaseDate={movie?.release_date}
                  overview={movie?.overview}
                  movieId={movie?.id}
                  setMovieId={setMovieId}
                  key={movie?.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
