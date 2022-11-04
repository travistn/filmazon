import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './MovieDetails.css';
import Trailer from '../../components/Trailer/Trailer';
import Cast from '../Cast/Cast';
import SimilarMedia from '../SimilarMovies/SimilarMovies';
import { convertMinutesToHours, formatDate } from '../../utils/Reuseables';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const [movieTrailer, setMovieTrailer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { movieId } = useParams();

  const mediaType = 'movie';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then((res) => setMovieInfo(res.data));
  }, [movieId]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`)
      .then((res) => setMovieTrailer(res.data.results?.find((movie) => movie.type === 'Trailer')));
  }, [movieId]);

  return (
    <div className='movieDetails__wrapper'>
      <div
        className='movieDetails__header__container'
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
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  title={movieTrailer?.name}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='cast__container'>
        <Cast mediaType={mediaType} showId={movieInfo.id} />
      </div>

      <SimilarMedia mediaType={mediaType} showId={movieInfo.id} />
    </div>
  );
};

export default MovieDetails;
