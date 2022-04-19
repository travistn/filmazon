import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

import './Sort.css';

const Sort = () => {
  const [sortIsOpen, setSortIsOpen] = useState(true);

  const toggleSort = () => {
    setSortIsOpen(!sortIsOpen);
  };

  return (
    <div className='sort__wrapper'>
      <div className='sort__container'>
        <div className='sort__header'>
          <h3>Sort</h3>
          <div className='sort-arrow' onClick={toggleSort}>
            {sortIsOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
        </div>
        {sortIsOpen ? (
          <div className='sort-results'>
            <h5>Sort Results By</h5>
            <div>
              <select>
                <option>Popularity Descending</option>
                <option>Popularity Ascending</option>
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sort;
