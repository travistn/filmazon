import { useState, useEffect } from 'react';
import axios from 'axios';

import './Cast.css';
import { CastCard } from '../../components/CastCard/CastCard';
import { apiKey } from '../../utils/Reuseables';

const Cast = ({ mediaType, showId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${showId}/credits?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setCast(res.data.cast));
  }, [showId, mediaType]);

  return (
    <div className='cast'>
      <h3>Top Billed Cast</h3>
      <div className='cast__list'>
        {cast?.map((person) => (
          <div key={person.id}>
            <CastCard person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
