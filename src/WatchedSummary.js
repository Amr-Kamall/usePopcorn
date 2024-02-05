import { useState } from "react";
import MovieDetails from "./MovieDetails";

function WatchedSummary({
  watched,
  selectId,
  onCloseMovie,
  onAddMovie,
  handleRemoveItem,
}) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box box2">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 &&
        (selectId ? (
          <MovieDetails
            watched={watched}
            onAddMovie={onAddMovie}
            selectId={selectId}
            onCloseMovie={onCloseMovie}
          />
        ) : (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{avgRuntime.toFixed(1)} min</span>
                </p>
              </div>
            </div>

            <ul className="list">
              {watched.map((movie) => (
                <li>
                  <img src={movie.poster} alt={`${movie.title} poster`} />
                  <h3>{movie.title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                    <button
                      className="btn-delete"
                      onClick={() => handleRemoveItem(movie.imdbID)}
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ))}
    </div>
  );
}

export default WatchedSummary;
