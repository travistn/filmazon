import { useEffect, useState, useRef } from 'react';

import Trailer from '../../components/Trailer/Trailer';
import Cast from '../Cast/Cast';
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import './MovieDetails.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const convertMinutesToHours = (n) => {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

const formatDate = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8);
  return `${month}/${day}/${year}`;
};

const MovieDetails = ({ movieId, setMovieId, setPersonId }) => {
  const [movieInfo, setMovieInfo] = useState({});
  const [movieTrailer, setMovieTrailer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef();

  const lookupMovieDetails = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setMovieInfo(data);
  };

  const getMovieTrailer = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setMovieTrailer(data.results?.find((movie) => movie.type === 'Trailer'));
  };

  const OnOutsideClick = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('click', listener);
      return () => {
        document.addEventListener('click', listener);
      };
    }, [ref, handler]);
  };

  OnOutsideClick(ref, () => setOpenModal(false));

  useEffect(() => {
    lookupMovieDetails(movieId);
    getMovieTrailer(movieId);
  }, [movieId]);

  return (
    <div className='movieDetails__wrapper'>
      <div
        className='movieDetails__header__container'
        ref={ref}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieInfo.backdrop_path})`,
        }}>
        <div className='movieDetails__header'>
          <img
            className='movieDetails__header-poster'
            src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
            alt='movie-poster'
          />
          <div className='movieDetails__header_info'>
            <div className='movieDetails__header_info-title'>
              <h3>
                {movieInfo.title}
                <span>{`(${movieInfo.release_date?.slice(0, 4)})`}</span>
              </h3>
              <p>{`${formatDate(movieInfo.release_date)} · ${movieInfo.genres?.map(
                (genre) => ` ${genre.name}`
              )} · ${convertMinutesToHours(movieInfo.runtime)} `}</p>
            </div>
            <div>
              <p className='movieDetails__header_info-tagline'>{movieInfo.tagline}</p>
              <h4 className='movieDetails__header_info-overview'>Overview</h4>
              <p className='movieDetails__header_info-overview-paragraph'>{movieInfo.overview}</p>
            </div>
            <div className='movieDetails__header_info-trailer'>
              <p onClick={() => setOpenModal(true)}>Play Trailer</p>
              {openModal && (
                <Trailer
                  trailerLink={`https://www.youtube.com/embed/${movieTrailer.key}`}
                  closeModal={setOpenModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='cast__container'>
        <Cast movieId={movieId} setPersonId={setPersonId} />
      </div>

      <SimilarMovies movieId={movieId} setMovieId={setMovieId} />
    </div>
  );
};

export default MovieDetails;
