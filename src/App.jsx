import { useState } from "react";
import "./App.css";
/*
The purpose of this file is to connect my React
frontend to the OMDB API
*/
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
console.log("API key loaded:", Boolean(API_KEY));

function App() {
  
  const [query, setQuery] = useState(""); // Query setup
  const [movies, setMovies] = useState([]); // Stores movies pulled from api
  const [loading, setLoading] = useState(false); // Displays a message while loading
  const [error, setError] = useState("");

  async function searchMovies(event) {
    event.preventDefault(); // Prevents unnecessariy refreshing

    // Doesn't search if the input is empty
    if (!query.trim()) {
      return;
    }

    //Show the loading message and remove any previous error.
    setLoading(true);
    setError("");

    //Converts the search
    try {
       const url =
        `https://www.omdbapi.com/` +
        `?apikey=${API_KEY}` +
        `&s=${encodeURIComponent(query)}` +
        `&type=movie`;
        
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovies(data.Search);

    } catch (error) {
      setMovies([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <h1>Movie Database</h1>

      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      <section className="movie-grid">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.imdbID}>
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div>No poster available</div>
            )}

            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <p>Type: {movie.Type}</p>

            <button type="button">Add to Watchlist</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;