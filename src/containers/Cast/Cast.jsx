import { useState, useEffect } from 'react';

import { CastCard } from '../../components/CastCard/CastCard';
import blank_profile from '../../assets/blank-profile.jpg';
import './Cast.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const Cast = ({ movieId, setPersonId }) => {
  const [cast, setCast] = useState([]);

  const getCast = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setCast(data.cast);
  };

  useEffect(() => {
    getCast(movieId);
  }, [movieId]);

  return (
    <div className='cast'>
      <h3>Top Billed Cast</h3>
      <div className='cast__list'>
        {cast?.map((person) => (
          <CastCard
            picture={
              person.profile_path !== null
                ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`
                : blank_profile
            }
            cast_name={person?.name}
            character_name={person?.character}
            personId={person.id}
            setPersonId={setPersonId}
          />
        ))}
      </div>
    </div>
  );
};

export default Cast;
