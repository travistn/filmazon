import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Trending from './containers/Trending/Trending';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import Person from './containers/Person/Person';
import SearchList from './containers/SearchList/SearchList';
import Movies from './containers/Movies/Movies';
import NowPlaying from './containers/NowPlaying/NowPlaying';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState();

  // const [tvShows, setTvShows] = useState([]);
  // const [tvShowId, setTvShowId] = useState();

  const [personId, setPersonId] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {/* <SearchMovie setMovies={setMovies} /> */}
              {/* <Movies movies={movies} /> */}
              <Header setMovies={setMovies} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
          path={`person/${personId}`}
          element={<Person personId={personId} setMovieId={setMovieId} />}
        />
        <Route
          path={`search/movie/${searchTerm}`}
          element={<SearchList movies={movies} setMovieId={setMovieId} />}
        />
        <Route path={'movies'} element={<Movies setMovieId={setMovieId} />} />
      </Routes>
    </>
  );
};

export default App;
