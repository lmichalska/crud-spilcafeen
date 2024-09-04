import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]); // state to handle the data (games)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort
  const languages = [...new Set(games.map(game => game.language))];
  // games: name of the state
  // setGames: name of the function to set the state

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games"); // get data from local storage

      let gamesData = [];

      if (data) {
        // if data exists in local storage
        gamesData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage fetch the data from the API
        gamesData = await fetchGames(); // fetch the data from the API
      }

      console.log(gamesData);
      setGames(gamesData); // set the games state with the data from local storage
    }
  }, []);

  async function fetchGames() {
    const response = await fetch("https://raw.githubgamecontent.com/cederdorff/race/master/data/games.json"); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("games", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter and sort the games array
  let filteredGames = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const locations = [...new Set(games.map(game => game.location))]; // get all the unique locations from the games array

  if (filter != "") {
    filteredGames = filteredGames.filter(game => game.location === filter); // filter the games array by the selected location
  }

  filteredGames.sort((game1, game2) => game1[sortBy].localeCompare(game2[sortBy])); // sort the games array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Location
          <select onChange={e => setFilter(e.target.value)}>
            <option value="location">select location</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by Language
          <select onChange={e => setFilter(e.target.value)}>
            <option value="language">select language</option>
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
