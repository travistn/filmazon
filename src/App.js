import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Trending from './containers/Trending/Trending';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import TVDetails from './containers/TVDetails/TVDetails';
import Person from './containers/Person/Person';
import SearchList from './containers/SearchList/SearchList';
import Movies from './containers/Movies/Movies';
import NowPlaying from './containers/NowPlaying/NowPlaying';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState();

  const [tvShows, setTvShows] = useState([]);
  const [tvId, setTvId] = useState();

  const [personId, setPersonId] = useState();
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header
                setMovies={setMovies}
                setTvShows={setTvShows}
                setPeople={setPeople}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <NowPlaying setMovieId={setMovieId} />
              <Trending setMovieId={setMovieId} />
            </>
          }></Route>
        <Route
          path={`movie/${movieId}`}
          element={
            <MovieDetails movieId={movieId} setMovieId={setMovieId} setPersonId={setPersonId} />
          }
        />
        <Route
          path={`tv/${tvId}`}
          element={<TVDetails tvId={tvId} setTvId={setTvId} setPersonId={setPersonId} />}
        />
        <Route
          path={`person/${personId}`}
          element={<Person personId={personId} setMovieId={setMovieId} setTvId={setTvId} />}
        />
        <Route
          path={`search&query=${searchTerm}`}
          element={
            <SearchList
              movies={movies}
              setMovieId={setMovieId}
              tvShows={tvShows}
              setTvId={setTvId}
              people={people}
              setPersonId={setPersonId}
            />
          }
        />
        <Route path={'movies'} element={<Movies setMovieId={setMovieId} />} />
      </Routes>
    </>
  );
};

export default App;
