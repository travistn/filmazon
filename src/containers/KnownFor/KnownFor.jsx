import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './KnownFor.css';
import { apiKey } from '../../utils/Reuseables';

const KnownFor = ({ name, personId }) => {
  const [credits, setCredits] = useState();
  const navigate = useNavigate();

  const knownForHandler = (e) => {
    const mediaType = e.currentTarget.getAttribute('mediatype');
    const id = e.currentTarget.getAttribute('value');

    navigate(`/${mediaType}/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${name}&page=1&include_adult=false`
      )
      .then((res) => setCredits(res.data.results));
  }, [name]);

  return (
    <div className='knownFor__container'>
      {credits?.map(
        (person) =>
          person.id === personId &&
          person?.known_for.map((credit) => (
            <div
              className='knownFor__card'
              mediatype={credit?.media_type}
              value={credit?.id}
              onClick={knownForHandler}
              key={credit?.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${credit?.poster_path}`}
                alt='media-poster'
              />
              <div className='knownFor__card-text'>
                <p>{credit?.media_type === 'movie' ? credit?.title : credit?.name}</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default KnownFor;
