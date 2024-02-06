import { useEffect, useRef, useState } from "react";
import Movies from "./Movies";
import WatchedSummary from "./WatchedSummary";

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

//`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
const KEY = "fec27eea";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  const [error, setError] = useState("");
  const [selectId, setSelectId] = useState(null);

  function handleSelectId(id) {
    setSelectId((selected) => (selected === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectId(null);
  }

  function handleAddMovie(newMovie) {
    setWatched([...watched, newMovie]); //current state + new movie
    localStorage.setItem("watched", JSON.stringify([...watched, newMovie]));
  }
  function handleRemoveItem(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function getData() {
        try {
          setError(""); //set the error to empty string
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("somthing went wrong with fetching movies");
            //after this if condition all rest of code will not excute
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("movie not found");
          }
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          // update the error state and take it's value to the component
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();

      getData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(function () {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    });
  }, []);

  return (
    <>
      <Header query={query} setQuery={setQuery} movies={movies} />
      <main className="main">
        <Movies
          isLoading={isLoading}
          movies={movies}
          setMovies={setMovies}
          error={error}
          handleSelectId={handleSelectId}
        />

        <WatchedSummary
          isLoading={isLoading}
          onAddMovie={handleAddMovie}
          onCloseMovie={handleCloseMovie}
          watched={watched}
          selectId={selectId}
          handleRemoveItem={handleRemoveItem}
        />
      </main>
    </>
  );
}

function Header({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEle = useRef(null);
  useEffect(function () {
    function callback() {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Enter") inputEle.current.focus();
      });
      return function () {
        document.addEventListener("keydown", callback);
      };
    }
    callback();
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEle}
    />
  );
}
