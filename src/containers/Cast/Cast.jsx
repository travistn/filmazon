import { useState, useEffect, useCallback } from 'react';

import { CastCard } from '../../components/CastCard/CastCard';
import blank_profile from '../../assets/blank-profile.jpg';
import './Cast.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Cast = ({ mediaType, showId }) => {
  const [cast, setCast] = useState([]);

  const getCast = useCallback(
    async (showId) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${showId}/credits?api_key=${apiKey}&language=en-US`
      );

      const data = await response.json();

      setCast(data.cast);
    },
    [mediaType]
  );

  useEffect(() => {
    getCast(showId);
  }, [showId, getCast]);

  return (
    <div className='cast'>
      <h3>Top Billed Cast</h3>
      <div className='cast__list'>
        {cast?.map((person) => (
          <div key={person.id}>
            <CastCard
              picture={
                person.profile_path !== null
                  ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`
                  : blank_profile
              }
              cast_name={person?.name}
              character_name={person?.character}
              personId={person.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
