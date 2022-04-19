import { useNavigate } from 'react-router-dom';

import './CastCard.css';

export const CastCard = ({ picture, cast_name, character_name, personId, setPersonId }) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    const id = e.currentTarget.getAttribute('value');
    setPersonId(id);

    navigate(`/person/${id}`);
  };

  return (
    <div className='cast__card' onClick={clickHandler} value={personId}>
      <img className='cast-img' src={picture} alt='cast-img' />
      <div className='cast__card-content'>
        <p className='cast__card-actor'>{cast_name}</p>
        <p className='cast__card-character'>{character_name}</p>
      </div>
    </div>
  );
};
