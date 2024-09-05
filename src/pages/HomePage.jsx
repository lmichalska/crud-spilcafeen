import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const sortBy = "name";

  useEffect(() => {
    async function getGames() {
      const data = localStorage.getItem("games");
      let gamesData = [];

      if (data) {
        gamesData = JSON.parse(data);
        console.log("Loaded games from localStorage:", gamesData);
      } else {
        gamesData = await fetchGames();
        localStorage.setItem("games", JSON.stringify(gamesData));
        console.log("Fetched and stored games data:", gamesData);
      }

      setGames(gamesData);
    }

    getGames();
  }, []);

  async function fetchGames() {
    try {
      const response = await fetch(/"crud-spilcafeen/games.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data from games.json:", data);
      return data;
    } catch (error) {
      console.error("Error fetching the games data:", error);
      return [];
    }
  }

  // Filter and

