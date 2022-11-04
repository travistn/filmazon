import { useNavigate } from 'react-router-dom';

import './CastCard.css';
import blank_profile from '../../assets/blank-profile.jpg';

export const CastCard = ({ person }) => {
  const navigate = useNavigate();

  return (
    <div className='cast__card' onClick={() => navigate(`/person/${person?.id}`)}>
      <img
        className='cast-img'
        src={
          person.profile_path !== null
            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`
            : blank_profile
        }
        alt='cast-img'
      />
      <div className='cast__card-content'>
        <p className='cast__card-actor'>{person?.name}</p>
        <p className='cast__card-character'>{person?.character}</p>
      </div>
    </div>
  );
};
