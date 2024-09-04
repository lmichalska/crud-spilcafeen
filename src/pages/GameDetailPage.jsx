import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Assuming you're using GameDetail:
import GameDetail from "../components/GameDetail"; 

export default function GameDetailPage() {
  const [game, setGameDetail] = useState(null); // initialize with null
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("games"); 
    const gamesData = JSON.parse(data) || []; 
    const game = gamesData.find(game => game.id === id); 
    if (game) {
      setGameDetail(game); 
    } else {
      // Navigate to a "not found" page or show an error
      navigate("/not-found");
    }
  }, [id, navigate]);

  function showDeleteDialog() {
    const shouldDelete = window.confirm(`Do you want to delete "${game?.name}"?`); // handle possible null
    if (shouldDelete) {
      deleteGame();
    }
  }

  async function deleteGame() {
    const data = localStorage.getItem("games"); 
    const gamesData = JSON.parse(data) || []; 
    const updatedGames = gamesData.filter(game => game.id !== id); 
    localStorage.setItem("games", JSON.stringify(updatedGames)); 
    navigate("/"); 
  }

  function showUpdate() {
    navigate(`/games/${id}/update`);
  }

  return (
    <section id="game-page" className="page">
      <div className="container">
        <h1>{game?.name || "Game Not Found"}</h1> 
        {game ? (
          <>
            <GameDetail game={game} /> {/* Assuming GameDetail is the correct component */}
            <div className="btns">
              <button className="btn-cancel" onClick={showDeleteDialog}>
                Delete game
              </button>
              <button onClick={showUpdate}>Update game</button>
            </div>
          </>
        ) : (
          <p>Loading game details...</p> // Or handle the "game not found" case here
        )}
      </div>
    </section>
  );
}
