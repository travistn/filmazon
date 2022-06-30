import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsInstagram, BsTwitter, BsFacebook } from 'react-icons/bs';

import KnownFor from '../KnownFor/KnownFor';
import { Credits } from '../Credits/Credits';
import './Person.css';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const gender = (num) => {
  if (num === 1) {
    return 'Female';
  }
  if (num === 2) {
    return 'Male';
  }
};

const Person = ({ setMovieId, setTvId }) => {
  const [person, setPerson] = useState();
  const [socials, setSocials] = useState();
  const { personId } = useParams();

  const getPerson = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setPerson(data);
  };

  const getPersonSocials = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    setSocials(data);
  };

  useEffect(() => {
    getPerson(personId);
    getPersonSocials(personId);
  }, [personId]);

  return (
    <div className='person__wrapper'>
      <div className='person__page'>
        <div className='person-columns__wrapper'>
          <div className='person__page-left__column'>
            <img
              className='person-picture'
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`}
              alt='person-img'
            />
            <div className='person__information'>
              <h3>Personal Info</h3>
              <section className='person__socials'>
                <a
                  href={`https://instagram.com/${socials?.instagram_id}`}
                  target='_blank'
                  rel='noreferrer'>
                  <BsInstagram />
                </a>
                <a
                  href={`https://twitter.com/${socials?.twitter_id}`}
                  target='_blank'
                  rel='noreferrer'>
                  <BsTwitter />
                </a>
                <a
                  href={`https://facebook.com/${socials?.facebook_id}`}
                  target='_blank'
                  rel='noreferrer'>
                  <BsFacebook />
                </a>
              </section>
              <section className='person__information-header'>
                <h5>Known For</h5>
                <p>{person?.known_for_department}</p>
              </section>
              <section className='person__information-header'>
                <h5>Gender</h5>
                <p>{gender(person?.gender)}</p>
              </section>
              <section className='person__information-header'>
                <h5>Birthday</h5>
                <p>{person?.birthday}</p>
              </section>
              <section className='person__information-header'>
                <h5>Place of Birth</h5>
                <p>{person?.place_of_birth}</p>
              </section>
              <section className='person__information-header'>
                <h5>Also Known As</h5>
                <div>
                  {person?.also_known_as.map((name, i) => (
                    <p key={i + 1}>{name}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className='person__page-right__column'>
            <section className='person-name'>
              <h2>{person?.name}</h2>
            </section>
            <section className='person-biography'>
              <h4>Biography</h4>
              <p>{person?.biography}</p>
            </section>
            <section className='person-knownFor'>
              <h4>Known For</h4>
              <KnownFor name={person?.name} personId={person?.id} />
            </section>
            <section className='person-credits'>
              <div>
                <Credits personId={personId} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
