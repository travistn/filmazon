import { useState } from 'react';

import SearchListCard from '../../components/SearchListCard/SearchListCard';
import './SearchList.css';

const SearchList = ({ movies, tvShows, setMovieId, setTvId }) => {
  const [category, setCategory] = useState('movie');

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
                    {movies.length}
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
                    {tvShows.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='searchList__right-column'>
          {category === 'movie' && (
            <>
              {movies?.map((movie) => (
                <SearchListCard
                  image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${movie?.poster_path}`}
                  title={movie?.title}
                  releaseDate={movie?.release_date}
                  overview={movie?.overview}
                  showId={movie?.id}
                  setMovieId={setMovieId}
                  mediaCategory={category}
                  key={movie?.id}
                />
              ))}
            </>
          )}
          {category === 'tv' && (
            <>
              {tvShows?.map((tv) => (
                <SearchListCard
                  image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${tv?.poster_path}`}
                  title={tv?.name}
                  releaseDate={tv?.first_air_date}
                  overview={tv?.overview}
                  showId={tv?.id}
                  setTvId={setTvId}
                  mediaCategory={category}
                  key={tv?.id}
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
