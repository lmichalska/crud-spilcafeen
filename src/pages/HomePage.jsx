import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const sortBy = "name"; // Sorting by game name

  const languages = [...new Set(games.map(game => game.language))];
  const locations = [...new Set(games.map(game => game.location))];

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games");
      let gamesData = [];

      if (data) {
        gamesData = JSON.parse(data);
      } else {
        gamesData = await fetchGames();
      }

      console.log(gamesData);
      setGames(gamesData);
    }
  }, []);

  async function fetchGames() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/cederdorff/race/master/data/users.json");
      const data = await response.json();
      localStorage.setItem("games", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  // Filter games by search term, location, and language
  let filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply location filter if selected
  if (locationFilter !== "") {
    filteredGames = filteredGames.filter(game => game.location === locationFilter);
  }

  // Apply language filter if selected
  if (languageFilter !== "") {
    filteredGames = filteredGames.filter(game => game.language === languageFilter);
  }

  // Sort games by a defined field
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