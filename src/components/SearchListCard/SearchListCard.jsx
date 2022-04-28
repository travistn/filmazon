import { useNavigate } from 'react-router-dom';

import './SearchListCard.css';

const SearchListCard = ({
  image,
  title,
  releaseDate,
  overview,
  showId,
  setMovieId,
  setTvId,
  mediaCategory,
}) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');

    if (mediaCategory === 'movie') {
      setMovieId(id);
      navigate(`/movie/${id}`);
    }

    if (mediaCategory === 'tv') {
      setTvId(id);
      navigate(`/tv/${id}`);
    }
  };

  return (
    <div className='searchList__card'>
      <img
        className='searchList__card-image'
        src={image}
        onClick={clickHandler}
        value={showId}
        alt='card-poster'
      />
      <div className='searchList__card-content'>
        <h4 onClick={clickHandler} value={showId}>
          {title}
        </h4>
        <h5>{releaseDate}</h5>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default SearchListCard;
