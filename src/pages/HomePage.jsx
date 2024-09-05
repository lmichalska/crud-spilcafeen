import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const sortBy = "name";
  const languages = [...new Set(games.map(game => game.language))];
  const locations = [...new Set(games.map(game => game.location))];

  useEffect(() => {
    async function getGames() {
      const data = localStorage.getItem("games");
      let gamesData = [];

      if (data) {
        gamesData = JSON.parse(data);
      } else {
        gamesData = await fetchGames();
        localStorage.setItem("games", JSON.stringify(gamesData)); // Store in localStorage for future use
      }

      console.log(gamesData);
      setGames(gamesData);
    }

    getGames();
  }, []);

  async function fetchGames() {
    try {
      const response = await fetch("/games.json"); // Correct path
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching the games data:", error);
      return []; // Return empty array in case of error
    }
  }

  let filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (locationFilter !== "") {
    filteredGames = filteredGames.filter(game => game.location === locationFilter);
  }

  if (languageFilter !== "") {
    filteredGames = filteredGames.filter(game => game.language === languageFilter);
  }

  filteredGames.sort((game1, game2) => game1[sortBy].localeCompare(game2[sortBy]));

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Location
          <select onChange={e => setLocationFilter(e.target.value)}>
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by Language
          <select onChange={e => setLanguageFilter(e.target.value)}>
            <option value="">Select Language</option>
            {languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredGames.map(game => (
          <Game game={game} key={game.id} />
        ))}
      </section>
    </section>
  );
}
