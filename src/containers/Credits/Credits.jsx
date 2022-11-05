import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Credits.css';
import { apiKey } from '../../utils/Reuseables';

const formatYear = (date) => {
  return date?.slice(0, 4);
};

export const Credits = ({ personId }) => {
  const [credits, setCredits] = useState();
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const creditsHandler = (e) => {
    const mediaType = e.currentTarget.getAttribute('mediatype');
    const id = e.currentTarget.getAttribute('value');

    navigate(`/${mediaType}/${id}`);
  };

  const filterHandler = (e) => {
    const filterName = e.currentTarget.value;

    setFilter(filterName);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setCredits(res.data));
  }, [personId]);

  const creditsContainingTitle = credits?.cast.filter((credit) => {
    return credit.title || credit.name != null;
  });

  const movieCredits = credits?.cast.filter((credit) => {
    return credit.title != null;
  });

  const tvCredits = credits?.cast.filter((credit) => {
    return credit.name != null;
  });

  const sortedTitles = creditsContainingTitle?.sort((a, b) => {
    return a.release_date < b.first_air_date ||
      a.first_air_date < b.release_date ||
      a.release_date < b.release_date ||
      a.first_air_date < b.first_air_date
      ? 1
      : a.release_date > b.first_air_date ||
        a.first_air_date > b.release_date ||
        a.release_date > b.release_date ||
        a.first_air_date > b.first_air_date
      ? -1
      : 0;
  });

  const sortedMovieTitles = movieCredits?.sort((a, b) => {
    return a.release_date < b.release_date ? 1 : a.release_date > b.release_date ? -1 : 0;
  });

  const sortedTvTitles = tvCredits?.sort((a, b) => {
    return a.first_air_date < b.first_air_date ? 1 : a.first_air_date > b.first_air_date ? -1 : 0;
  });

  const filterSelector =
    filter === 'all'
      ? sortedTitles
      : filter === 'movies'
      ? sortedMovieTitles
      : filter === 'tv'
      ? sortedTvTitles
      : null;

  return (
    <>
      <div className='credits__header'>
        <h4>Acting</h4>
        <div className='credits-filter'>
          <select onClick={filterHandler}>
            <option value='all'>All</option>
            <option value='movies'>Movies</option>
            <option value='tv'>TV</option>
          </select>
        </div>
      </div>
      <table className='credits__table'>
        <tbody>
          {filterSelector?.map((credit) => (
            <tr className='table__group' key={credit?.id}>
              <td className='credit-releaseDate'>
                {formatYear(credit?.release_date || credit?.first_air_date)}
              </td>
              <td
                className='credit-title'
                value={credit?.id}
                mediatype={credit?.media_type}
                onClick={creditsHandler}>
                {credit?.title || credit?.name}
                <span className='credits-characterAs'>
                  {' as '}
                  <span className='credits-characterName'>{credit?.character}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
