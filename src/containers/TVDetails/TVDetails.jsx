import { useState, useEffect, useRef } from 'react';

import Trailer from '../../components/Trailer/Trailer';
import Cast from '../Cast/Cast';
import SimilarMedia from '../SimilarMovies/SimilarMovies';
import './TVDetails.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const formatDate = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8);
  return `${month}/${day}/${year}`;
};

const convertMinutesToHours = (n) => {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

const TVDetails = ({ tvId, setTvId, setPersonId }) => {
  const [tvInfo, setTvInfo] = useState({});
  const [tvTrailer, setTvTrailer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef();

  const mediaType = 'tv';

  const lookupTVDetails = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setTvInfo(data);
  };

  const getTVTrailer = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setTvTrailer(data.results?.find((tv) => tv.type === 'Trailer'));
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
    lookupTVDetails(tvId);
    getTVTrailer(tvId);
  }, [tvId]);

  return (
    <div className='tvDetails__wrapper'>
      <div
        className='tvDetails__header__container'
        ref={ref}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tvInfo.backdrop_path})`,
        }}>
        <div className='tvDetails__header'>
          <img
            className='tvDetails__header-poster'
            src={`https://image.tmdb.org/t/p/w500${tvInfo.poster_path}`}
            alt='tv-poster'
          />
          <div className='tvDetails__header_info'>
            <div className='tvDetails__header_info-title'>
              <h3>
                {tvInfo.original_name}
                <span>{`(${tvInfo.first_air_date?.slice(0, 4)})`}</span>
              </h3>
              <p>{`${formatDate(tvInfo.first_air_date)} · ${tvInfo.genres?.map(
                (genre) => ` ${genre.name}`
              )} · ${convertMinutesToHours(tvInfo.episode_run_time)} `}</p>
            </div>

            <div>
              <p className='tvDetails__header_info-tagline'>{tvInfo.tagline}</p>
              <h4 className='tvDetails__header_info-overview'>Overview</h4>
              <p className='tvDetails__header_info-overview-paragraph'>{tvInfo.overview}</p>
            </div>

            <div className='tvDetails__header_info-trailer'>
              <p onClick={() => setOpenModal(true)}>Play Trailer</p>
              {openModal && (
                <Trailer
                  trailerLink={`https://www.youtube.com/embed/${tvTrailer?.key}`}
                  closeModal={setOpenModal}
                  title={tvTrailer?.name}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='cast__container'>
        <Cast mediaType={mediaType} showId={tvId} setPersonId={setPersonId} />
      </div>

      <SimilarMedia mediaType={mediaType} showId={tvId} setShow={setTvId} />
    </div>
  );
};

export default TVDetails;
