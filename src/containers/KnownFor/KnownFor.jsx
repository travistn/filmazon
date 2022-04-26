import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './KnownFor.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const KnownFor = ({ name, personId, setMovieId }) => {
  const [credits, setCredits] = useState();
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setMovieId(id);
    navigate(`/movie/${id}`);
  };

  const getKnownFor = async (name) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${name}&page=1&include_adult=false`
    );

    const data = await response.json();

    setCredits(data.results);
  };

  useEffect(() => {
    getKnownFor(name);
  }, [name]);

  return (
    <div className='knownFor__container'>
      {credits?.map(
        (person) =>
          person.id === personId &&
          person?.known_for.map((credit) => (
            <div className='knownFor__card' value={credit?.id} onClick={clickHandler}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${credit?.poster_path}`}
                alt='movie-poster'
              />
              <div className='knownFor__card-text'>
                <p>{credit?.title}</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default KnownFor;
