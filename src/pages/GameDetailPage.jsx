import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameDetail from "../components/GameDetail"; 

export default function GameDetailPage() {
  const [game, setGameDetail] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("games"); 
    const gamesData = JSON.parse(data) || []; 
    const game = gamesData.find(game => game.id === id); 
    if (game) {
      setGameDetail(game); 
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  function showDeleteDialog() {
    const shouldDelete = window.confirm(`Do you want to delete "${game?.name}"?`); 
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
            <GameDetail game={game} /> {}
            <div className="btns">
              <button className="btn-cancel" onClick={showDeleteDialog}>
                Delete game
              </button>
              <button onClick={showUpdate}>Update game</button>
            </div>
          </>
        ) : (
          <p>Loading game details...</p> 
        )}
      </div>
    </section>
  );
}
