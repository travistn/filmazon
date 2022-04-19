import SearchListCard from '../../components/SearchListCard/SearchListCard';
import './SearchList.css';

const SearchList = ({ movies, setMovieId }) => {
  return (
    <div className='searchList__wrapper'>
      <div className='searchList__container'>
        <div className='searchList__left-column'>
          <div className='results__container'>
            <div className='results-header'>
              <p>Search Results</p>
            </div>
            <ul className='results-categories'>
              <li>Movies</li>
            </ul>
          </div>
        </div>
        <div className='searchList__right-column'>
          {movies.map((movie) => (
            <SearchListCard
              image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${movie?.poster_path}`}
              title={movie?.title}
              releaseDate={movie?.release_date}
              overview={movie?.overview}
              movieId={movie?.id}
              setMovieId={setMovieId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
