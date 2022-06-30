import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Trending from './containers/Trending/Trending';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import TVDetails from './containers/TVDetails/TVDetails';
import Person from './containers/Person/Person';
import SearchList from './containers/SearchList/SearchList';
import Movies from './containers/Movies/Movies';
import NowPlaying from './containers/NowPlaying/NowPlaying';

import { AppContext } from './contexts/AppContext';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [people, setPeople] = useState([]);

  const contextvalues = {
    movies,
    setMovies,
    tvShows,
    setTvShows,
    people,
    setPeople,
  };

  return (
    <AppContext.Provider value={contextvalues}>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <NowPlaying />
              <Trending />
            </>
          }></Route>
        <Route path={`movie/:movieId`} element={<MovieDetails />} />
        <Route path={`tv/:tvId`} element={<TVDetails />} />
        <Route path={`person/:personId`} element={<Person />} />
        <Route
          path={`search&query=:searchTerm`}
          element={<SearchList movies={movies} tvShows={tvShows} people={people} />}
        />
        <Route path={'movies'} element={<Movies />} />
        <Route path={'signup'} element={<Signup />} />\
        <Route path={'login'} element={<Login />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
