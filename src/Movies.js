import React from "react";
import { useState } from "react";
import Spinner from "./Spinner";
import MyError from "./MyError";

function Movies({ movies, isLoading, error, handleSelectId }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && (
        <>
          {isLoading && <Spinner />}
          {error && <MyError message={error} />}
          {!error && !isLoading && (
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <li onClick={() => handleSelectId(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Movies;
