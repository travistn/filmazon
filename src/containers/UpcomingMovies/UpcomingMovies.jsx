import { useState, useEffect } from 'react';

const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const searchUpcomingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    );

    const data = await response.json();

    setUpcomingMovies(data.results);
  };

  useEffect(() => {
    searchUpcomingMovies();
  }, []);

  console.log(upcomingMovies);

  return (
    <div>
      {/* {upcomingMovies.map((movie) => {
        <div>{movie.original_title}</div>;
      })} */}
    </div>
  );
};

export default UpcomingMovies;
