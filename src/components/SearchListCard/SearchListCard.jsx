import { useNavigate } from 'react-router-dom';

import './SearchListCard.css';

const SearchListCard = ({ image, title, releaseDate, overview, movieId, setMovieId }) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setMovieId(id);
    navigate(`/movie/${id}`);
  };

  return (
    <div className='searchList__card'>
      <img
        className='searchList__card-image'
        src={image}
        onClick={clickHandler}
        value={movieId}
        alt='card-poster'
      />
      <div className='searchList__card-content'>
        <h4 onClick={clickHandler} value={movieId}>
          {title}
        </h4>
        <h5>{releaseDate}</h5>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default SearchListCard;