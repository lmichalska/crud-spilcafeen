import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameForm from "../components/GameForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    setGame(gamesData.find(game => game.id === id));
  }, [id]); 

  async function updateGame(gameToUpdate) {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    const updatedGames = gamesData.map(game => {

      if (game.id === id) {
        return { ...game, ...gameToUpdate }; 
      }
      return game; 
    });

    localStorage.setItem("games", JSON.stringify(updatedGames)); 
    navigate(`/games/${id}`); 
  }

  function handleCancel() {
    navigate(-1); 
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <GameForm onSubmit={updateGame} onCancel={handleCancel} game={game} />
      </div>
    </section>
  );
}
