import { useNavigate } from "react-router-dom";

export default function Game({ game }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/games/${game.id}`);
  }

  return (
    <article className="game-card" onClick={handleClick}>
      <img src={game.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={game.name} />
      <h2>
        {game.name} 
      </h2>
    </article>
  );
}
