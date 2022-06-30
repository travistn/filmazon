import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchListCard from '../../components/SearchListCard/SearchListCard';
import './SearchList.css';

const SearchList = ({ movies, tvShows, people }) => {
  const [category, setCategory] = useState('movie');
  const navigate = useNavigate();

  const changeCategory = (e) => {
    setCategory(e.target.id);
  };

  const directToPerson = (e) => {
    const id = e.currentTarget.getAttribute('value');

    navigate(`/person/${id}`);
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
                <div className={`results-label ${category === 'person' ? 'results-selected' : ''}`}>
                  <h5 id='person' onClick={changeCategory}>
                    People
                  </h5>
                  <div
                    className={`results-num ${
                      category === 'person' ? 'results-num-selected' : 'results-num-unselected'
                    }`}>
                    {people.length}
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
                  mediaCategory={category}
                  key={tv?.id}
                />
              ))}
            </>
          )}
          {category === 'person' && (
            <>
              {people?.map((person) => (
                <div className='searchList-person__card'>
                  <img
                    src={`https://www.themoviedb.org/t/p/w90_and_h90_face/${person?.profile_path}`}
                    alt='profile-pic'
                    value={person?.id}
                    onClick={directToPerson}
                  />
                  <div className='searchList-person__card-content'>
                    <h5 value={person?.id} onClick={directToPerson}>
                      {person?.name}
                    </h5>
                    <p>
                      {person?.known_for_department} •
                      {person?.known_for.map((show) => ` ${show?.original_title || show?.name}, `)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
