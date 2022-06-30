import { Modal } from '@mui/material';
import { IoMdClose } from 'react-icons/io';

import './Trailer.css';

const Trailer = ({ trailerLink, openModal, setOpenModal, title }) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal((prevState) => !prevState)}>
      <div className='trailer__background'>
        <div className='trailer__container'>
          <div className='trailer__titlebar'>
            <p>Play Trailer</p>
            <IoMdClose className='trailer__close' onClick={() => setOpenModal(false)} />
          </div>
          <iframe className='trailer__video' title={title} src={trailerLink} allowFullScreen />
        </div>
      </div>
    </Modal>
  );
};

export default Trailer;
