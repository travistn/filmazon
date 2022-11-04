import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './SimilarMovies.css';
import { apiKey } from '../../utils/Reuseables';

const SimilarMedia = ({ mediaType, showId }) => {
  const [similarMedia, setSimilarMedia] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${showId}/similar?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setSimilarMedia(res.data.results));
  }, [showId, mediaType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='similarMedia__wrapper'>
      <div className='similarMedia__container'>
        <h3>Similar {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h3>
        <div className='similarMedia__list'>
          {similarMedia?.map((show) => (
            <div className='similarMedia__card' key={show.id}>
              <img
                src={`https://www.themoviedb.org/t/p/w250_and_h141_face/${show?.backdrop_path}`}
                alt='movie-poster'
                onClick={() => navigate(`/${mediaType}/${show.id}`)}
              />
              <p onClick={() => navigate(`/${mediaType}/${show.id}`)}>
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
