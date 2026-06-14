import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1>Movie Database</h1>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button>Search</button>

      <p>You typed: {search}</p>
    </div>
  );
}

export default App;