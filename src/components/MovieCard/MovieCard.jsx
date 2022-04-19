import { useNavigate } from 'react-router-dom';

import './MovieCard.css';

const MovieCard = ({ image, title, releaseDate, movieId, setMovieId }) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setMovieId(id);

    navigate(`/movie/${id}`);
  };

  return (
    <div className='movie__card'>
      <img src={image} alt='movie-poster' onClick={clickHandler} value={movieId} />
      <div className='movie__card-content'>
        <p className='movie__card-title' onClick={clickHandler} value={movieId}>
          {title}
        </p>
        <p className='movie__card-releaseDate'>{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
