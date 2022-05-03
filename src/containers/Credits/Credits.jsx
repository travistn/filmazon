import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDownSFill } from 'react-icons/ri';

import './Credits.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const formatYear = (date) => {
  return date?.slice(0, 4);
};

export const Credits = ({ personId, setMovieId, setTvId }) => {
  const [credits, setCredits] = useState();
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const mediaType = e.currentTarget.getAttribute('mediaType');
    const id = e.currentTarget.getAttribute('value');

    if (mediaType === 'movie') setMovieId(id);
    if (mediaType === 'tv') setTvId(id);

    navigate(`/${mediaType}/${id}`);
  };

  const getCredits = async (personId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setCredits(data);
  };

  useEffect(() => {
    getCredits(personId);
  }, [personId]);

  const creditsContainingTitle = credits?.cast.filter((credit) => {
    return credit.title || credit.name != null;
  });

  return (
    <>
      <div className='credits__header'>
        <h4>Acting</h4>
        <div className='credits-filter'>
          <h5>
            All
            <span>
              <RiArrowDownSFill />
            </span>
          </h5>
        </div>
      </div>
      <table className='credits__table'>
        <tbody>
          {creditsContainingTitle
            ?.sort((a, b) => {
              if (
                formatYear(a.release_date || a.first_air_date) <
                formatYear(b.release_date || b.first_air_date)
              )
                return 1;
              else if (
                formatYear(a.release_date || a.first_air_date) >
                formatYear(b.release_date || b.first_air_date)
              )
                return -1;
              else return 0;
            })
            .map((credit) => (
              <table className='table__group'>
                <tbody>
                  <tr>
                    <td className='credit-releaseDate'>
                      {formatYear(credit?.release_date || credit?.first_air_date)}
                    </td>
                    <td
                      className='credit-title'
                      value={credit?.id}
                      mediaType={credit?.media_type}
                      onClick={clickHandler}>
                      {credit?.title || credit?.name}
                      <span className='credits-characterAs'>
                        {' as '}
                        <span className='credits-characterName'>{credit?.character}</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
        </tbody>
      </table>
    </>
  );
};
