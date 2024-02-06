import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import StarRating from "./StarRating";
const KEY = "fec27eea";

function MovieDetails({ selectId, onCloseMovie, onAddMovie, watched }) {
  const [userRating, setUserRating] = useState(0);
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(false);
  // const search = watched.map((ele) => ele.imdbID).includes(selectId);
  const rated = watched.find((ele) => ele.imdbID === selectId)?.userRating;
  // console.log(rated);
  const finded = watched.find((ele) => ele.imdbID === selectId);
  console.log(finded);
  const {
    Title: title,
    Poster: poster,
    Actors: actors,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Director: director,
  } = movieDetail;
  useEffect(
    function () {
      async function getmovieDetails() {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectId}`
        );
        const data = await res.json();
        setLoading(false);
        setMovieDetail(data);
        setUserRating(0);
      }
      getmovieDetails();
    },
    [selectId, setUserRating]
  );

  function handleAddMovie() {
    const newMovie = {
      title,
      poster,
      runtime: parseFloat(runtime.split(" ").at(0)),
      imdbRating: parseInt(imdbRating),
      imdbID: selectId,
      userRating,
    };
    onAddMovie(newMovie);
    onCloseMovie();
    setUserRating(0);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!finded ? (
                <>
                  <span>
                    <StarRating
                      userRating={userRating}
                      setUserRating={setUserRating}
                    />
                  </span>
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + add to list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>you rated this movie with ⭐{rated} </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
