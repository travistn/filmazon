import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './TVDetails.css';
import Trailer from '../../components/Trailer/Trailer';
import Cast from '../Cast/Cast';
import SimilarMedia from '../SimilarMovies/SimilarMovies';
import { convertMinutesToHours, formatDate, apiKey } from '../../utils/Reuseables';

const TVDetails = () => {
  const [tvInfo, setTvInfo] = useState({});
  const [tvTrailer, setTvTrailer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { tvId } = useParams();

  const mediaType = 'tv';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US`)
      .then((res) => setTvInfo(res.data));
  }, [tvId]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${apiKey}&language=en-US`)
      .then((res) => setTvTrailer(res.data.results?.find((tv) => tv.type === 'Trailer')));
  }, [tvId]);

  return (
    <div className='tvDetails__wrapper'>
      <div
        className='tvDetails__header__container'
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
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  title={tvTrailer?.name}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='cast__container'>
        <Cast mediaType={mediaType} showId={tvInfo.id} />
      </div>
      <SimilarMedia mediaType={mediaType} showId={tvInfo.id} />
    </div>
  );
};

export default TVDetails;
