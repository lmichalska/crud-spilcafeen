async function fetchGames() {
  try {
    const response = await fetch("/games.json"); // Correct path
    const data = await response.json();
    setGames(data);
  } catch (error) {
    console.error("Error fetching the games data:", error);
  }
}
