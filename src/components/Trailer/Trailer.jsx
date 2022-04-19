import { IoMdClose } from 'react-icons/io';

import './Trailer.css';

const Trailer = ({ trailerLink, closeModal }) => {
  return (
    <div className='trailer__background'>
      <div className='trailer__container'>
        <div className='trailer__titlebar'>
          <p>Play Trailer</p>
          <IoMdClose className='trailer__close' onClick={() => closeModal(false)} />
        </div>
        <iframe className='trailer__video' src={trailerLink} allowFullScreen />
      </div>
    </div>
  );
};

export default Trailer;
