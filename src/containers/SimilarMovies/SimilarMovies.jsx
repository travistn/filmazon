import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './SimilarMovies.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const SimilarMedia = ({ mediaType, showId, setShow }) => {
  const [similarMedia, setSimilarMedia] = useState([]);
  const navigate = useNavigate();

  const getSimilarMedia = useCallback(
    async (showId) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${showId}/similar?api_key=${apiKey}&language=en-US&page=1`
      );

      const data = await response.json();

      setSimilarMedia(data.results);
    },
    [mediaType]
  );

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setShow(id);

    navigate(`/${mediaType}/${id}`);
  };

  useEffect(() => {
    getSimilarMedia(showId);
  }, [showId, getSimilarMedia]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='similarMedia__wrapper'>
      <div className='similarMedia__container'>
        <h3>Similar {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h3>
        <div className='similarMedia__list'>
          {similarMedia?.map((show) => (
            <div className='similarMedia__card'>
              <img
                src={`https://www.themoviedb.org/t/p/w250_and_h141_face/${show?.backdrop_path}`}
                alt='movie-poster'
                onClick={clickHandler}
                value={show?.id}
              />
              <p onClick={clickHandler} value={show?.id}>
                {mediaType === 'movie' ? show?.title : show?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarMedia;
